import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useToken = create<{
  token: string;
  setToken: (s: string) => void;
}>()(
  persist(
    (set) => ({
      token: "",
      setToken: (s: string) => set({ token: s }),
    }),
    {
      name: "me",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
