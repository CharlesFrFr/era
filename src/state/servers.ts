import { create } from "zustand";
import era from "src/external/client";

type ServersState = {
  servers: Map<string, Server>;
  add: (server: Server) => void;
  remove: (server: Server) => void;
  update: (server: Server) => void;
  load: () => void;
  loaded: boolean;
};

export const useServers = create<ServersState>((set) => ({
  servers: new Map(),
  add: (server) => {
    set((state) => {
      const servers = new Map(state.servers);
      servers.set(server.uuid, server);
      return { servers };
    });
  },
  remove: (server) => {
    set((state) => {
      const servers = new Map(state.servers);
      servers.delete(server.uuid);
      return { servers };
    });
  },
  update: (server) => {
    set((state) => {
      const servers = new Map(state.servers);
      servers.set(server.uuid, server);
      return { servers };
    });
  },
  load: async () => {
    const [servers] = await era.servers();

    const serversMap = servers.data.reduce((acc, server) => {
      acc[server.uuid] = server;
      return acc;
    }, {} as Record<string, Server>);
    const map = new Map(Object.entries(serversMap));

    set({ servers: map, loaded: true });
  },
  loaded: false,
}));
