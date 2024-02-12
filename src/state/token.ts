import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useToken = create<{
  working: boolean;
  token: string;
  setToken: (s: string) => void;
  setWorking: (b: boolean) => void;
}>()(
  persist(
    (set) => ({
      working: false,
      token: "",
      setToken: (s: string) => set({ token: s }),
      setWorking: (b: boolean) => set({ working: b }),
    }),
    {
      name: "me",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
