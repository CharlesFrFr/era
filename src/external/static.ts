import { AxiosError } from "axios";
import { axiosClient } from "./client";

type BannerResponse = {
  data: Array<Banner>;
};
export const banners = async () => {
  const response = await axiosClient
    .get<BannerResponse>("/launcher/banners")
    .catch((error: AxiosError) => error);

  if (response instanceof AxiosError || response === null) {
    return [
      {
        data: [
          {
            background: "generic_audio_video",
            body: "Season 7, with the slogan **You Better Watch Out**, was the seventh season of **Fortnite**.",
            build: {
              build: "7.40-CL-5046157",
              name: "Fortnite 7.40",
              season: { name: "Season 7" },
              uuid: "c2258301-017b-4b6b-89e8-9c5ffea5767c",
            },
            header: "You Better Watch Out",
            meta: {
              audio:
                "https://cdn.discordapp.com/attachments/1133049187362160752/1185940636017369179/y2mate.is_-_Fortnite_Festive_Lobby_Music_C1S7_Battle_Pass_-V48HXBP41vs-192k-1702820669.mp3?ex=65917049&is=657efb49&hm=62f9825b2f97fa03f704292822a8b90958c2b8e23103ac6ea00b743fdc713ae9&",
              background:
                "https://cdn.discordapp.com/attachments/1065028039500640286/1181718747942236240/7.40_2023.12.05_-_22.06.10.38.DVR_-_Trim.mp4?ex=658b4ed8&is=6578d9d8&hm=c8c9e99659c24781d6419868b5efb9684f7b1557cea79b7e1d086ebf376fb62f&",
              background_styles: { filter: "brightness(0.65)" },
              background_v:
                "https://cdn.discordapp.com/attachments/1029738528382406697/1181705877032534136/Untitled_video_-_Made_with_Clipchamp_4.mp4?ex=6582085c&is=656f935c&hm=99628f0ba7fe649543096a5782d90d988bea5ec0207f66c9d0e4b45e02da9cbb&",
              blurhash: "LTA-D4yZRPROD%M{o#ogotxZj]a}",
              coming_soon: false,
              index: 15,
              interval: 15000,
              interval_v: 50000,
              shows_countdown: false,
              shows_volume_control: true,
              tags: ["players", "queue"],
            },
            starts_at: "2023-12-17T19:00:00Z",
          },
          {
            background: "generic",
            body: "Queue up in tournaments to test your **skill**! Score at least 120 points in a session and obtain 3000 V-Bucks!",
            build: {
              build: "7.40-CL-5046157",
              name: "Fortnite 7.40",
              season: { name: "Practice Event - Daily Trials" },
              uuid: "c2258301-017b-4b6b-89e8-9c5ffea5767c",
            },
            header: "PRACTICE TOURNAMENT SOLO",
            meta: {
              background:
                "https://cdn.erafn.org/tournaments/alpha/playlist.png",
              background_styles: { filter: "brightness(0.75)" },
              blurhash: "LUA:5VV|KnRWW1jFVvb]N2j?nObI",
              body_styles: { color: "#ACFFD3", fontWeight: 900 },
              header_styles: { color: "#FFF736" },
              headline_styles: {
                color: "#ffffff",
                fontFamily: "system-ui",
                fontWeight: 900,
              },
              index: 2,
              shows_countdown: true,
              tags: [["_message", "date", "Jan. 22nd - Jan. 24th"]],
            },
            starts_at: "2024-01-22T18:00:00Z",
          },
        ],
      } as BannerResponse,
      null,
    ] as const;
  }

  return [response.data, null] as const;
};
