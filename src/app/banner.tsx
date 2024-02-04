import { useEffect, useRef, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryInsights } from "src/external/wrapper";
import { motion } from "framer-motion";
import moment from "moment";

import { Blurhash } from "react-blurhash";
import {
  FaCalendar,
  FaClock,
  FaUser,
  FaVolumeHigh,
  FaVolumeXmark,
} from "react-icons/fa6";
import Markdown from "react-markdown";
import { useGlobal } from "src/state/global";
import { useShallow } from "zustand/react/shallow";

type BannerProps = {
  banner: Banner;
};

const FeaturedBanner = (props: BannerProps) => {
  const banner = props.banner;
  const backgroundUrlRaw = banner.meta.background.split("?")[0];
  const fileType = backgroundUrlRaw.split(".").pop();
  const mediaType = fileType === "mp4" ? "video" : "image";

  const [mutedBannerAudio, setMutedBannerAudio] = useGlobal(
    useShallow((s) => [s.mutedBannerAudio, s.setMutedBannerAudio])
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  const { data: queue } = useSuspenseQuery({
    queryKey: ["queue"],
    queryFn: queryInsights,
  });

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.05;
  }, [audioRef]);

  const extraBody_styles = banner.meta.hasOwnProperty("body_styles");
  const extraHeaderStyles = banner.meta.hasOwnProperty("header_styles");
  const extraHeadlineStyles = banner.meta.hasOwnProperty("headline_styles");

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
        {banner.meta.tags.find((t) => t === "players") && (
          <div className="tag">
            <FaUser />
            {queue.players}
          </div>
        )}
        {banner.meta.tags.find((t) => t === "queue") && (
          <div className="tag">
            <FaClock />
            {moment
              .utc(1000 * queue.average_queue_time.duration)
              .format("mm:ss")}
          </div>
        )}
        {banner.meta.tags.find((t) => t instanceof Array) && (
          <div className="tag">
            <FaCalendar />
            {banner.meta.tags.find((t) => t instanceof Array)![2]}
          </div>
        )}
        {banner.background === "generic_audio_video" && (
          <button
            className="muter"
            onClick={() => setMutedBannerAudio(!mutedBannerAudio)}
          >
            {!mutedBannerAudio ? <FaVolumeHigh /> : <FaVolumeXmark />}
          </button>
        )}
      </div>
      <div className="information">
        <span
          className="header"
          style={extraHeadlineStyles ? banner.meta.headline_styles : {}}
        >
          {banner.build.season.name}
        </span>
        <h2
          className="title"
          style={extraHeaderStyles ? banner.meta.header_styles : {}}
        >
          {banner.header}
        </h2>
        <div
          className="description"
          style={extraBody_styles ? banner.meta.body_styles : {}}
        >
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

export default FeaturedBanner;
