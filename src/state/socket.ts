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

type SocketState = {
  socket: WebSocket | null;
  connect: () => void;
  listeners: Map<
    SocketDownEventType,
    ((event: ReturnType<typeof eventDataTupleToObj>) => void)[]
  >;
  bind: <T extends SocketDownEventType>(
    type: T,
    listener: (event: ReturnType<typeof eventDataTupleToObj>) => void
  ) => void;
  unbind: <T extends SocketDownEventType>(
    type: T,
    listener: (event: ReturnType<typeof eventDataTupleToObj>) => void
  ) => void;
  emit: <T extends SocketUpEventData>(event: T) => void;
};

export const useSocket = create<SocketState>((set, get) => ({
  listeners: new Map(),
  socket: null,
  connect: () => {
    const state = get();
    if (state.socket) return;

    const token = useToken.getState().token;
    const socket = new WebSocket(
      `wss://ws.erafn.org/launcher/websocket?token=${token}&vsn=2.0.0`
    );

    const pinger = setInterval(() => {
      get().emit({
        id: null,
        ref: "1",
        channel: "phoenix",
        type: "heartbeat",
        payload: {},
      });
    }, 30000);

    socket.addEventListener("open", () => {
      get().bind("ping", (event) => {
        console.log("ping", event);
      });

      get().emit({
        id: null,
        ref: "1",
        channel: "phoenix",
        type: "heartbeat",
        payload: {},
      });
    });

    socket.addEventListener("message", (event) => {
      console.log("message", event.data);
      const { listeners } = get();
      const data = JSON.parse(event.data) as [
        id: string,
        ref: string,
        channel: string,
        type: string,
        payload: any
      ];

      switch (data[2].split(":")[0]) {
        case "phoenix":
          const currentListeners = listeners.get("ping") || [];
          currentListeners.forEach((listener) =>
            listener(JSON.parse(event.data))
          );
          break;
      }
    });

    socket.addEventListener("close", () => {
      console.log("[socket] disconnected!");
      set({ socket: null });
      clearInterval(pinger);
    });

    set({ socket });
  },
  bind: (type, listener) => {
    const { listeners } = get();
    const currentListeners = listeners.get(type) || [];
    listeners.set(type, [...currentListeners, listener]);
    set({ listeners });
  },
  unbind: (type, listener) => {
    const { listeners } = get();
    const currentListeners = listeners.get(type) || [];
    listeners.set(
      type,
      currentListeners.filter((l) => l !== listener)
    );
    set({ listeners });
  },
  emit: (event) => {
    const { socket } = get();
    if (!socket) return;

    socket.send(JSON.stringify(eventDataObjToTuple(event)));
  },
}));
