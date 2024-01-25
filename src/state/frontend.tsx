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
  blogs: Blog[];
  load: () => void;
  loaded: boolean;
};

export const useFrontend = create<FrontendState>((set) => ({
  loaded: false,
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
  blogs: [],
  load: async () => {
    const [oldBanners] = await era.banners();
    const newBanners = oldBanners.data.map((banner) => ({
      precomputedBlur: <Blurhash hash={banner.meta.blurhash} />,
      banner,
    }));

    const [shop] = await era.shop();
    const [blogs] = await era.blogs();
    set({
      banners: newBanners,
      shop: shop.data,
      blogs: blogs.data,
      loaded: true,
    });
  },
}));
