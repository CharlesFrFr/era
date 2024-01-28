import { create } from "zustand";
import { useToken } from "src/state/token";
import { queryClient } from "src/main";

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
  connectMain: () => void;
  connectServer: () => void;
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

    switch (data.id) {
      case "server":
        state.emit(data.id, {
          channel: "status:servers",
          type: "phx_join",
          payload: {},
        });
    }
  });

  socket.addEventListener("message", (event) => {
    const socketMessage = eventDataTupleToObj(JSON.parse(event.data));

    switch (socketMessage.channel) {
      case "phoenix":
        const me = state.sockets.get(data.id);
        if (!me) return;

        const listeners = me.listeners.get("ping");
        if (!listeners) return;

        listeners.forEach((listener) =>
          listener(eventDataTupleToObj(JSON.parse(event.data)))
        );
        break;
      case "status:servers":
        const server = state.sockets.get(data.id);
        if (!server) return;

        const listenerEventName =
          socketMessage.type === "update"
            ? "server:update"
            : socketMessage.type === "server_add"
            ? "server:add"
            : socketMessage.type === "server_remove"
            ? "server:remove"
            : null;
        if (!listenerEventName) return;

        const serverListeners = server.listeners.get(listenerEventName);
        if (!serverListeners) return;

        serverListeners.forEach((listener) =>
          listener(eventDataTupleToObj(JSON.parse(event.data)))
        );

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
  connectMain: () => {
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
  connectServer: () => {
    const state = get();
    if (state.sockets.get("server")) return;

    const socket = socketHandler(state, {
      id: "server",
    });

    set((state) => {
      const sockets = state.sockets;
      sockets.set("server", {
        socket,
        listeners: new Map(),
      });
      return { sockets };
    });

    get().bind("server", "server:add", (event) =>
      queryClient.setQueryData<Server[]>(["servers"], (servers) => [
        ...(servers || []),
        event.payload as Server,
      ])
    );
    get().bind("server", "server:update", (event) =>
      queryClient.setQueryData<Server[]>(["servers"], (servers) => {
        const server = event.payload as Server;
        const serverIndex = servers?.findIndex(
          (s) => s.uuid === server.uuid && s.name === server.name
        );
        if (serverIndex === undefined || serverIndex === -1) return servers;

        const newServers = [...(servers || [])];
        newServers[serverIndex] = server;
        return newServers;
      })
    );
    get().bind("server", "server:remove", (event) =>
      queryClient.setQueryData<Server[]>(["servers"], (servers) => {
        const server = event.payload as Server;
        const serverIndex = servers?.findIndex(
          (s) => s.uuid === server.uuid && s.name === server.name
        );
        if (serverIndex === undefined || serverIndex === -1) return servers;

        const newServers = [...(servers || [])];
        newServers.splice(serverIndex, 1);
        return newServers;
      })
    );
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
