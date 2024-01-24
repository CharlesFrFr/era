import era from "src/external/client";
import { create } from "zustand";
import { Blurhash } from "react-blurhash";

type FrontendState = {
  banners: {
    precomputedBlur: React.ReactNode;
    banner: Banner;
  }[];
  shop: {
    daily: ShopStorefront;
    featured: ShopStorefront;
    unique: string;
  };
  load: () => void;
};

export const useFrontend = create<FrontendState>((set) => ({
  banners: [],
  shop: {
    daily: {
      content: [],
      expires_at: "",
    },
    featured: {
      content: [],
      expires_at: "",
    },
    unique: "",
  },
  load: async () => {
    const [oldBanners] = await era.banners();
    const newBanners = oldBanners.data.map((banner) => ({
      precomputedBlur: <Blurhash hash={banner.meta.blurhash} />,
      banner,
    }));

    const [shop] = await era.shop();
    set({ banners: newBanners, shop: shop.data });
  },
}));
