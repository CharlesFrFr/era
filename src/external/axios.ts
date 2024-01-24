import { AxiosError } from "axios";
import { axiosClient } from "./client";
import { useMe } from "src/state/me";

type BannerResponse = {
  data: Array<Banner>;
};
export const banners = async () => {
  const response = await axiosClient
    .get<BannerResponse>("/launcher/banners", {
      headers: {
        Authorization: `bearer ${useMe.getState().auth}`,
      },
    })
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
        Authorization: `bearer ${useMe.getState().auth}`,
      },
    })
    .catch((error: AxiosError) => error);

  if (response instanceof AxiosError || response === null) {
    return [
      {
        data: {
          daily: {
            content: [
              [
                {
                  item: {
                    category: "Biker Brigade",
                    description: "Glide down in a blaze of glory.",
                    featured_image:
                      "https://fortnite-api.com/images/cosmetics/br/glider_id_064_biker/featured.png",
                    image:
                      "https://fortnite-api.com/images/cosmetics/br/glider_id_064_biker/icon.png",
                    name: "Blaze",
                    rarity: "uncommon",
                    type: "glider",
                  },
                  price: 500,
                },
                {
                  item: {
                    category: null,
                    description: "No autographs please.",
                    featured_image:
                      "https://fortnite-api.com/images/cosmetics/br/eid_popdance01/featured.png",
                    image:
                      "https://fortnite-api.com/images/cosmetics/br/eid_popdance01/icon.png",
                    name: "Star Power",
                    rarity: "epic",
                    type: "emote",
                  },
                  price: 800,
                },
                {
                  item: {
                    category: null,
                    description: "Rare brawler outfit.",
                    featured_image:
                      "https://fortnite-api.com/images/cosmetics/br/cid_021_athena_commando_f/featured.png",
                    image:
                      "https://fortnite-api.com/images/cosmetics/br/cid_021_athena_commando_f/icon.png",
                    name: "Brawler",
                    rarity: "rare",
                    type: "skin",
                  },
                  price: 1200,
                },
                {
                  item: {
                    category: null,
                    description:
                      "Climb your way to the top with the mountaineering inspired Cliffhanger Pickaxe.",
                    featured_image: null,
                    image:
                      "https://fortnite-api.com/images/cosmetics/br/skiicepickaxe/icon.png",
                    name: "Cliffhanger",
                    rarity: "rare",
                    type: "pickaxe",
                  },
                  price: 800,
                },
                {
                  item: {
                    category: null,
                    description: "What's so funny?",
                    featured_image:
                      "https://fortnite-api.com/images/cosmetics/br/eid_laugh/featured.png",
                    image:
                      "https://fortnite-api.com/images/cosmetics/br/eid_laugh/icon.png",
                    name: "Laugh It Up",
                    rarity: "rare",
                    type: "emote",
                  },
                  price: 500,
                },
                {
                  item: {
                    category: null,
                    description: "Rare special forces outfit.",
                    featured_image:
                      "https://fortnite-api.com/images/cosmetics/br/cid_020_athena_commando_m/featured.png",
                    image:
                      "https://fortnite-api.com/images/cosmetics/br/cid_020_athena_commando_m/icon.png",
                    name: "Special Forces",
                    rarity: "rare",
                    type: "skin",
                  },
                  price: 1200,
                },
              ],
            ],
            expires_at: "2024-01-24T23:59:59Z",
          },
          featured: {
            content: [
              [
                {
                  item: {
                    category: "Vanishing Point",
                    description: "Take over the competition.",
                    featured_image:
                      "https://fortnite-api.com/images/cosmetics/br/cid_190_athena_commando_m_streetracerwhite/featured.png",
                    image:
                      "https://fortnite-api.com/images/cosmetics/br/cid_190_athena_commando_m_streetracerwhite/icon.png",
                    name: "Overtaker",
                    rarity: "epic",
                    type: "skin",
                  },
                  price: 1500,
                },
                {
                  item: {
                    category: "Vanishing Point",
                    description: "Create a whirlwind.",
                    featured_image:
                      "https://fortnite-api.com/images/cosmetics/br/glider_id_062_streetracerwhite/featured.png",
                    image:
                      "https://fortnite-api.com/images/cosmetics/br/glider_id_062_streetracerwhite/icon.png",
                    name: "White Squall",
                    rarity: "epic",
                    type: "glider",
                  },
                  price: 1200,
                },
                {
                  item: {
                    category: "Vanishing Point",
                    description: "Break away from the pack.",
                    featured_image:
                      "https://fortnite-api.com/images/cosmetics/br/cid_188_athena_commando_f_streetracerwhite/featured.png",
                    image:
                      "https://fortnite-api.com/images/cosmetics/br/cid_188_athena_commando_f_streetracerwhite/icon.png",
                    name: "Whiteout",
                    rarity: "epic",
                    type: "skin",
                  },
                  price: 1500,
                },
              ],
              [
                {
                  item: {
                    category: "Fort Knights",
                    description: "The red menace of Anarchy Acres.",
                    featured_image:
                      "https://fortnite-api.com/images/cosmetics/br/cid_034_athena_commando_f_medieval/featured.png",
                    image:
                      "https://fortnite-api.com/images/cosmetics/br/cid_034_athena_commando_f_medieval/icon.png",
                    name: "Red Knight",
                    rarity: "legendary",
                    type: "skin",
                  },
                  price: 2000,
                },
                {
                  item: {
                    category: "Fort Knights",
                    description: "Wield, smite, repeat.",
                    featured_image:
                      "https://fortnite-api.com/images/cosmetics/br/pickaxe_id_066_flintlockred/featured.png",
                    image:
                      "https://fortnite-api.com/images/cosmetics/br/pickaxe_id_066_flintlockred/icon.png",
                    name: "Crimson Axe",
                    rarity: "rare",
                    type: "pickaxe",
                  },
                  price: 800,
                },
              ],
            ],
            expires_at: "2024-01-24T23:59:59Z",
          },
          unique:
            "09b0848a44404b2abe5026205eb4e4cee5c6ef61906f45618b56b9aa4532a956",
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
        Authorization: `bearer ${useMe.getState().auth}`,
      },
    })
    .catch((error: AxiosError) => error);

  if (response instanceof AxiosError || response === null) {
    return [
      {
        data: {
          avatar: "https://cdn.discordapp.com/avatars/1187385098271971334/",
          character: {
            icon: "https://fortnite-api.com/images/cosmetics/br/cid_286_athena_commando_f_neoncat/icon.png",
          },
          currency: 120,
          discord: "1187385098271971334",
          role: { color: "#94a3b8", name: "Member" },
          roles: ["1168273420925018214", "1015696679585976351"],
          username: "Anonymous",
          uuid: "2242e238-9999-4f47-b159-1b6886d7030a",
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
        Authorization: `bearer ${useMe.getState().auth}`,
      },
    })
    .catch((error: AxiosError) => error);

  if (response instanceof AxiosError || response === null) {
    return [
      {
        data: {
          kdr: 1,
          matches: 200,
          time: 9999,
          wins: 31,
        },
      } as UserStatsResponse,
      null,
    ] as const;
  }

  return [response.data, null] as const;
};
