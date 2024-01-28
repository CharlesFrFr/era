import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type PersistState = {
  adverts: Record<string, Advert>;
  close: (id: string) => void;
};

export const useAdverts = create<PersistState>()(
  persist(
    (set) => ({
      adverts: {
        build: {
          id: "build",
          c1: "#ae56e9",
          c2: "#6a5bec",
          closeable: true,
          title:
            "**Note!** You can download the publicly available version `7.40-CL-5046157`",
        },
        notice: {
          id: "notice",
          c1: "#e63838",
          c2: "#a5680b",
          closeable: false,
          title:
            "**Disclaimer!** This launcher is not affialiated with _Era_ or endorsed by them in any way.",
        },
      },
      close: (id) => {
        set((state) => {
          const adverts = { ...state.adverts };
          delete adverts[id];
          return { adverts };
        });
      },
    }),
    {
      name: "adverts",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
