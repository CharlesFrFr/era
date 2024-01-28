import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useToken = create<{
  token: string;
  setter: (s: string) => void;
}>()(
  persist(
    (set) => ({
      token: "",
      setter: (s: string) => set({ token: s }),
    }),
    {
      name: "me",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
