import era from "src/external/client";
import { create } from "zustand";
import { Blurhash } from "react-blurhash";

type FrontendState = {
  banners: {
    precomputedBlur: React.ReactNode;
    banner: Banner;
  }[];
  load: () => void;
};

export const useFrontend = create<FrontendState>((set) => ({
  banners: [],
  load: async () => {
    const [response] = await era.banners();

    const newBanners = response.data.map((banner) => ({
      precomputedBlur: <Blurhash hash={banner.meta.blurhash} />,
      banner,
    }));

    set({ banners: newBanners });
  },
}));
