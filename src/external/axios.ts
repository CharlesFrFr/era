import { AxiosError } from "axios";
import { axiosClient } from "./client";
import { useToken } from "src/state/token";

type BannerResponse = {
  data: Array<Banner>;
};
export const banners = async () => {
  const response = await axiosClient
    .get<BannerResponse>("/launcher/banners", {
      headers: {
        Authorization: `bearer ${useToken.getState().token}`,
      },
    })
    .catch((error: AxiosError) => error);

  if (response instanceof AxiosError || response === null) {
    return [
      {
        data: [],
      } as BannerResponse,
      null,
    ] as const;
  }

  return [response.data, null] as const;
};

type ShopResponse = {
  data: {
    daily: ShopStorefront;
    featured: ShopStorefront;
    unique: string;
  };
};

export const shop = async () => {
  const response = await axiosClient
    .get<ShopResponse>("/launcher/shop", {
      headers: {
        Authorization: `bearer ${useToken.getState().token}`,
      },
    })
    .catch((error: AxiosError) => error);

  if (response instanceof AxiosError || response === null) {
    return [
      {
        data: {
          daily: {
            content: [],
            expires_at: "2024-01-24T23:59:59Z",
          },
          featured: {
            content: [],
            expires_at: "",
          },
          unique: "",
        },
      } as ShopResponse,
      null,
    ] as const;
  }

  return [response.data, null] as const;
};

type UserResponse = {
  data: User;
};

export const user = async () => {
  const response = await axiosClient
    .get<UserResponse>("/launcher/user", {
      headers: {
        Authorization: `bearer ${useToken.getState().token}`,
      },
    })
    .catch((error: AxiosError) => error);

  if (response instanceof AxiosError || response === null) {
    return [
      {
        data: {
          avatar: "",
          character: {
            icon: "",
          },
          currency: 0,
          discord: "",
          role: { color: "#ffffff", name: "" },
          roles: [],
          username: "",
          uuid: "",
        },
      } as UserResponse,
      null,
    ] as const;
  }

  return [response.data, null] as const;
};

type UserStatsResponse = {
  data: UserStats;
};

export const stats = async () => {
  const response = await axiosClient
    .get<UserStatsResponse>("/launcher/user/stats", {
      headers: {
        Authorization: `bearer ${useToken.getState().token}`,
      },
    })
    .catch((error: AxiosError) => error);

  if (response instanceof AxiosError || response === null) {
    return [
      {
        data: {
          kdr: 0,
          matches: 0,
          time: 0,
          wins: 0,
        },
      } as UserStatsResponse,
      null,
    ] as const;
  }

  return [response.data, null] as const;
};

type BlogsResponse = {
  data: Blog[];
};

export const blogs = async () => {
  const response = await axiosClient
    .get<BlogsResponse>("/launcher/news/posts", {
      headers: {
        Authorization: `bearer ${useToken.getState().token}`,
      },
    })
    .catch((error: AxiosError) => error);

  if (response instanceof AxiosError || response === null) {
    return [
      {
        data: [],
      } as BlogsResponse,
      null,
    ] as const;
  }

  return [response.data, null] as const;
};

type ServersResponse = {
  data: Server[];
};

export const servers = async () => {
  const response = await axiosClient
    .get<ServersResponse>("/external/game/servers", {
      headers: {
        "x-era-client-token":
          "HVO4Dkf54RvWhWAWyCthiRQW0w5E1IJ4hXzlyzVgtvjXmYLEVXOO6GSsWL8ldSpa",
      },
    })
    .catch((error: AxiosError) => error);

  if (response instanceof AxiosError || response === null) {
    return [
      {
        data: [],
      } as ServersResponse,
      null,
    ] as const;
  }

  return [response.data, null] as const;
};

type QueueResponse = {
  data: Queue;
};

export const insights = async () => {
  const response = await axiosClient
    .get<QueueResponse>("/launcher/insights", {
      headers: {
        Authorization: `bearer ${useToken.getState().token}`,
      },
    })
    .catch((error: AxiosError) => error);

  if (response instanceof AxiosError || response === null) {
    return [
      {
        data: {
          average_queue_time: {
            duration: 0,
            preferred_region: "",
          },
          players: 0,
        },
      } as QueueResponse,
      null,
    ] as const;
  }

  return [response.data, null] as const;
};

type BuildsResponse = {
  data: Build[];
};

export const builds = async () => {
  const response = await axiosClient
    .get<BuildsResponse>("/launcher/builds", {
      headers: {
        Authorization: `bearer ${useToken.getState().token}`,
      },
    })
    .catch((error: AxiosError) => error);

  if (response instanceof AxiosError || response === null) {
    return [
      {
        data: [],
      } as BuildsResponse,
      null,
    ] as const;
  }

  return [response.data, null] as const;
};
