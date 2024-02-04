import { create } from "zustand";

type GlobalState = {
  selectedDownload: string;
  setSelectedDownload: (id: string) => void;
  mutedBannerAudio: boolean;
  setMutedBannerAudio: (muted: boolean) => void;
};

export const useGlobal = create<GlobalState>((set) => ({
  selectedDownload: "",
  setSelectedDownload: (id) => set({ selectedDownload: id }),
  mutedBannerAudio: true,
  setMutedBannerAudio: (muted: boolean) => set({ mutedBannerAudio: muted }),
}));
