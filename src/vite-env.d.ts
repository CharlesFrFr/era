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

/*
    {
      "background": "generic_audio_video",
      "body": "Season 7, with the slogan **You Better Watch Out**, was the seventh season of **Fortnite**.",
      "build": {
        "build": "7.40-CL-5046157",
        "name": "Fortnite 7.40",
        "season": { "name": "Season 7" },
        "uuid": "c2258301-017b-4b6b-89e8-9c5ffea5767c"
      },
      "header": "You Better Watch Out",
      "meta": {
        "audio": "https://cdn.discordapp.com/attachments/1133049187362160752/1185940636017369179/y2mate.is_-_Fortnite_Festive_Lobby_Music_C1S7_Battle_Pass_-V48HXBP41vs-192k-1702820669.mp3?ex=65917049&is=657efb49&hm=62f9825b2f97fa03f704292822a8b90958c2b8e23103ac6ea00b743fdc713ae9&",
        "background": "https://cdn.discordapp.com/attachments/1065028039500640286/1181718747942236240/7.40_2023.12.05_-_22.06.10.38.DVR_-_Trim.mp4?ex=658b4ed8&is=6578d9d8&hm=c8c9e99659c24781d6419868b5efb9684f7b1557cea79b7e1d086ebf376fb62f&",
        "background_styles": { "filter": "brightness(0.65)" },
        "background_v": "https://cdn.discordapp.com/attachments/1029738528382406697/1181705877032534136/Untitled_video_-_Made_with_Clipchamp_4.mp4?ex=6582085c&is=656f935c&hm=99628f0ba7fe649543096a5782d90d988bea5ec0207f66c9d0e4b45e02da9cbb&",
        "blurhash": "LTA-D4yZRPROD%M{o#ogotxZj]a}",
        "coming_soon": false,
        "index": 15,
        "interval": 15000,
        "interval_v": 50000,
        "shows_countdown": false,
        "shows_volume_control": true,
        "tags": ["players", "queue"]
      },
      "starts_at": "2023-12-17T19:00:00Z"
    },
      */

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
