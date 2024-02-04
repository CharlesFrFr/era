import { ReactNode, useEffect, useRef, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobal } from "src/state/global";
import { useShallow } from "zustand/react/shallow";
import { queryInsights } from "src/external/wrapper";
import { motion } from "framer-motion";
import moment from "moment";

import { Blurhash } from "react-blurhash";
import {
  FaCalendar,
  FaTriangleExclamation,
  FaClock,
  FaUser,
  FaVolumeHigh,
  FaVolumeXmark,
  FaCheck,
  FaCircleExclamation,
  FaCircleInfo,
} from "react-icons/fa6";
import Markdown from "react-markdown";

const removeKeysFromObject = (obj: Record<string, any>, keys: string[]) => {
  const clone = { ...obj };
  keys.forEach((key) => {
    delete clone[key];

    if (key === "fontWeight") {
      clone["filter"] = "brightness(1.2)";
      clone["fontWeight"] = "600";
    }
  });
  return clone;
};

type BannerProps = {
  banner: Banner;
};

const FeaturedBanner = (props: BannerProps) => {
  const banner = props.banner;
  const backgroundUrlRaw = banner.meta.background.split("?")[0];
  const fileType = backgroundUrlRaw.split(".").pop();
  const mediaType = fileType === "mp4" ? "video" : "image";

  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [mutedBannerAudio, setMutedBannerAudio] = useGlobal(
    useShallow((s) => [s.mutedBannerAudio, s.setMutedBannerAudio])
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.05;
  }, [audioRef]);

  const extraBodyStyles =
    banner.meta.hasOwnProperty("body_styles") &&
    removeKeysFromObject(banner.meta.body_styles, ["fontFamily", "fontWeight"]);
  const extraHeaderStyles =
    banner.meta.hasOwnProperty("header_styles") &&
    removeKeysFromObject(banner.meta.header_styles, ["fontFamily"]);
  const extraHeadlineStyles =
    banner.meta.hasOwnProperty("headline_styles") &&
    removeKeysFromObject(banner.meta.headline_styles, ["fontFamily"]);

  console.log(extraBodyStyles, extraHeaderStyles, extraHeadlineStyles);

  const starts = moment.utc(banner.starts_at);
  const duration = moment.duration(starts.diff(currentTime));
  const live = starts.isBefore(moment.utc());

  return (
    <div className="featured-event">
      <div className="background" style={banner.meta.background_styles}>
        <Blurhash hash={props.banner.meta.blurhash} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {banner.background === "generic_audio_video" && (
            <>
              <video
                src={banner.meta.background}
                autoPlay
                muted
                loop
                className="video"
              />

              <audio
                src={banner.meta.audio}
                autoPlay
                loop
                muted={mutedBannerAudio}
                ref={audioRef}
              />
            </>
          )}

          {mediaType === "image" && (
            <img
              src={banner.meta.background}
              alt={banner.header}
              className="image"
            />
          )}
        </motion.div>
      </div>
      <div className="tags">
        {banner.meta.tags.map((tag, i) => (
          <BannerTag tag={tag} key={i} />
        ))}
        <s />
        {banner.meta.shows_countdown && (
          <div className="tag starting">
            {live ? (
              <>
                <div className="loadingTimer live" />
                <p>Live now!</p>
              </>
            ) : (
              <>
                <div className="loadingTimer waiting" />
                <p>{`${Math.floor(
                  duration.asDays()
                )}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`}</p>
              </>
            )}
          </div>
        )}
        {banner.background === "generic_audio_video" &&
          banner.meta.shows_volume_control && (
            <button
              className="muter"
              onClick={() => setMutedBannerAudio(!mutedBannerAudio)}
            >
              {!mutedBannerAudio ? <FaVolumeHigh /> : <FaVolumeXmark />}
            </button>
          )}
      </div>
      <div className="information">
        <span className="header" style={extraHeadlineStyles || {}}>
          {banner.build.season.name}
        </span>
        <h2 className="title" style={extraHeaderStyles || {}}>
          {banner.header}
        </h2>
        <div className="description" style={extraBodyStyles || {}}>
          <Markdown>{banner.body}</Markdown>
        </div>
      </div>
      <div className="play">
        <strong>Fortnite</strong>
        <p>{banner.build.build}</p>
        <s />
        <button>Launch</button>
      </div>
    </div>
  );
};

type BannerTagProps = {
  tag: Banner["meta"]["tags"][number];
};

const BannerTag = (props: BannerTagProps) => {
  const { data: queue } = useSuspenseQuery({
    queryKey: ["queue"],
    queryFn: queryInsights,
  });

  if (props.tag instanceof Array) return <SpecialBannerTag tag={props.tag} />;

  const lookup: Record<string, ReactNode> = {
    players: (
      <>
        <FaUser />
        {queue.players}
      </>
    ),
    queue: (
      <>
        <FaClock />
        {moment.utc(1000 * queue.average_queue_time.duration).format("mm:ss")}
      </>
    ),
  };

  return <div className="tag">{lookup[props.tag]}</div>;
};

type SpecialBannerTagProps = {
  tag: [
    key: string,
    type: "date" | "success" | "danger" | "info" | "warning",
    value: string
  ];
};

const SpecialBannerTag = (props: SpecialBannerTagProps) => {
  const [_, type, value] = props.tag;

  const lookup: Record<(typeof props.tag)[1], ReactNode> = {
    date: <FaCalendar />,
    warning: <FaTriangleExclamation />,
    success: <FaCheck />,
    danger: <FaCircleExclamation />,
    info: <FaCircleInfo />,
  };

  return (
    <div className={`tag ${type}`}>
      {lookup[type]}
      {value}
    </div>
  );
};

export default FeaturedBanner;
