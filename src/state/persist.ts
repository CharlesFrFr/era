import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type PersistState = {
  advert: boolean;
  closeAdvert: (s: boolean) => void;
};

export const useGlobal = create<PersistState>()(
  persist(
    (set) => ({
      advert: true,
      closeAdvert: (s) => set({ advert: s }),
    }),
    {
      name: "persist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
