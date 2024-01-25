import { create } from "zustand";
import era from "src/external/client";

type ServersState = {
  servers: Server[];
  add: (server: Server) => void;
  remove: (server: Server) => void;
  update: (server: Server) => void;
  load: () => void;
  loaded: boolean;
};

export const useServers = create<ServersState>((set) => ({
  servers: [],
  add: (server) => set((state) => ({ servers: [...state.servers, server] })),
  remove: (server) =>
    set((state) => ({
      servers: state.servers.filter((s) => s.uuid !== server.uuid),
    })),
  update: (server) =>
    set((state) => ({
      servers: state.servers.map((s) => (s.uuid === server.uuid ? server : s)),
    })),
  load: async () => {
    const [servers] = await era.servers();
    set({ servers: servers.data, loaded: true });
  },
  loaded: false,
}));
