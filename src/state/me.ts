import era from "src/external/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type MeState = {
  auth: string;
  setAuthInput: (s: string) => void;
  era: User;
  stats: UserStats;
  load: () => void;
  loaded: boolean;
};

export const useMe = create<MeState>()(
  persist(
    (set) => ({
      setAuthInput: (s: string) => set({ auth: s }),
      auth: "",
      era: {
        avatar: "",
        character: {
          icon: "",
        },
        currency: 0,
        discord: "",
        role: { color: "#94a3b8", name: "Member" },
        roles: [],
        username: "",
        uuid: "",
      },
      stats: {
        kdr: 0,
        matches: 0,
        time: 0,
        wins: 0,
      },
      load: async () => {
        const [me] = await era.user();
        const [stats] = await era.stats();

        set({ era: me.data, stats: stats.data, loaded: true });
      },
      loaded: false,
    }),
    {
      name: "me",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
