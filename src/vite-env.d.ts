/// <reference types="vite/client" />#

type EventBanner = {
  background: "generic";
  body: string;
  build: {
    build: string;
    name: string;
    season: {
      name: string;
    };
    uuid: string;
  };
  header: string;
  meta: {
    background: string;
    background_styles: Record<string, any>;
    blurhash: string;
    body_styles: Record<string, any>;
    header_styles: Record<string, any>;
    headline_styles: Record<string, any>;
    index: number;
    shows_countdown: boolean;
    tags: [[type: string, key: string, value: string]];
  };
  starts_at: string;
};

type SeasonBanner = {
  background: "generic_audio_video";
  body: string;
  build: {
    build: string;
    name: string;
    season: {
      name: string;
    };
    uuid: string;
  };
  header: string;
  meta: {
    audio: string;
    background: string;
    background_styles: Record<string, any>;
    background_v: string;
    blurhash: string;
    coming_soon: boolean;
    index: number;
    interval: number;
    interval_v: number;
    shows_countdown: boolean;
    shows_volume_control: boolean;
    tags: string[];
  };
  starts_at: string;
};

type Banner = EventBanner | SeasonBanner;

//

type ShopEntry = {
  item: {
    category: string;
    description: string;
    featured_image: string;
    image: string;
    name: string;
    rarity: string;
    type: string;
  };
  price: number;
}[];

type ShopStorefront = {
  content: ShopEntry[];
  expires_at: string;
};

//

type User = {
  avatar: string;
  character: {
    icon: string;
  };
  currency: number;
  discord: string;
  role: {
    color: string;
    name: string;
  };
  roles: string[];
  username: string;
  uuid: string;
};

type UserStats = {
  kdr: number;
  matches: number;
  time: number;
  wins: number;
};

//

type Blog = {
  id: number;
  accent: string;
  author: string;
  body: string;
  header: string;
  image: string;
  inserted_at: string;
  meta: {
    blurhash?: string;
    height?: number;
    special?: boolean;
  };
  tags: string[];
  views: number;
};

//

type Server = {
  accepting_players: boolean;
  build: {
    name: string;
    build: string;
  };
  max_players: number;
  name: string;
  number_of_players: number;
  playlist: {
    image: string;
    name: string;
  };
  private: boolean;
  region: string;
  status: "online" | "offline";
  uuid: string;
};

//

type SocketPingDownEvent = [
  id: string,
  ref: string,
  channel: "phoenix",
  type: "phx_reply",
  payload: { response: {}; status: "ok" }
];

type SocketDownEventData = SocketPingDownEvent;
type SocketDownEventType = "ping" | "join";
type GetEventDataFromSocketDownEventType<T extends SocketDownEventType> =
  T extends "ping" ? SocketPingDownEvent : never;

type SocketPongUpEvent = {
  id: null;
  ref: string;
  channel: "phoenix";
  type: "heartbeat";
  payload: {};
};

type SocketUpEventData = SocketPongUpEvent;
