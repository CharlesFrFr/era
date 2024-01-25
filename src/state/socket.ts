import { create } from "zustand";
import { useToken } from "src/state/me";

const eventDataTupleToObj = <T extends SocketDownEventType>(
  tuple: GetEventDataFromSocketDownEventType<T>
) => {
  const [id, ref, channel, type, payload] = tuple;
  return { id, ref, channel, type, payload } as const;
};

const eventDataObjToTuple = <T extends SocketUpEventData>(obj: T) => {
  const { id, ref, channel, type, payload } = obj;
  return [id, ref, channel, type, payload] as const;
};

type BindableSocketDownEventType = (
  event: ReturnType<typeof eventDataTupleToObj>
) => void;

type SocketState = {
  sockets: Map<
    string,
    {
      socket: WebSocket | null;
      listeners: Map<SocketDownEventType, BindableSocketDownEventType[]>;
    }
  >;
  connect: () => void;
  bind: <T extends SocketDownEventType>(
    socketId: string,
    type: T,
    listener: BindableSocketDownEventType
  ) => void;
  unbind: <T extends SocketDownEventType>(
    socketId: string,
    type: T,
    listener: BindableSocketDownEventType
  ) => void;
  emit: <T extends SocketUpEventData>(socketId: string, event: T) => void;
};

const socketHandler = (
  state: SocketState,
  data:
    | {
        id: "main";
        url: string;
      }
    | {
        id: "server";
        auth: string;
      }
): WebSocket => {
  const socket = new WebSocket(
    data.id === "main"
      ? data.url
      : "wss://ws.erafn.org/external/websocket?token=HVO4Dkf54RvWhWAWyCthiRQW0w5E1IJ4hXzlyzVgtvjXmYLEVXOO6GSsWL8ldSpa&vsn=2.0.0"
  );

  const pinger = setInterval(() => {
    state.emit(data.id, {
      id: null,
      ref: "1",
      channel: "phoenix",
      type: "heartbeat",
      payload: {},
    });
  }, 30000);

  socket.addEventListener("open", () => {
    console.log(`[socket:${data.id}] connected!`);

    state.bind(data.id, "ping", (event) => {
      console.log(`[socket:${data.id}] ping event`, event);
    });

    state.emit(data.id, {
      id: null,
      ref: "1",
      channel: "phoenix",
      type: "heartbeat",
      payload: {},
    });
  });

  socket.addEventListener("message", (event) => {
    const socketMessage = JSON.parse(event.data) as [
      id: string,
      ref: string,
      channel: string,
      type: string,
      payload: any
    ];

    switch (socketMessage[2].split(":")[0]) {
      case "phoenix":
        const me = state.sockets.get(data.id);
        if (!me) return;

        const listeners = me.listeners.get("ping");
        if (!listeners) return;

        listeners.forEach((listener) => listener(JSON.parse(event.data)));
        break;
    }
  });

  socket.addEventListener("close", () => {
    console.log(`[socket:${data.id}] disconnected!`);
    state.sockets.delete(data.id);
    clearInterval(pinger);
  });

  return socket;
};

export const useSocket = create<SocketState>((set, get) => ({
  listeners: new Map(),
  sockets: new Map(),
  connect: () => {
    const state = get();
    if (state.sockets.get("main")) return;

    const token = useToken.getState().token;
    const socket = socketHandler(state, {
      id: "main",
      url: `wss://ws.erafn.org/launcher/websocket?token=${token}&vsn=2.0.0`,
    });

    set((state) => {
      const sockets = state.sockets;
      sockets.set("main", {
        socket,
        listeners: new Map(),
      });
      return { sockets };
    });
  },
  bind: (id, type, listener) => {
    const { sockets } = get();

    const entry = sockets.get(id);
    if (!entry) return;

    const currentListeners = entry.listeners.get(type) || [];
    entry.listeners.set(type, [...currentListeners, listener]);

    set({ sockets });
  },
  unbind: (id, type, listener) => {
    const { sockets } = get();

    const entry = sockets.get(id);
    if (!entry) return;

    const currentListeners = entry.listeners.get(type) || [];
    entry.listeners.set(
      type,
      currentListeners.filter((l) => l !== listener)
    );

    set({ sockets });
  },
  emit: (id, event) => {
    const { sockets } = get();

    const entry = sockets.get(id);
    if (!entry) return;

    entry.socket?.send(JSON.stringify(eventDataObjToTuple(event)));
  },
}));
