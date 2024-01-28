import { useSuspenseQuery } from "@tanstack/react-query";
import { queryInsights } from "src/external/wrapper";
import { motion } from "framer-motion";
import moment from "moment";

import { Blurhash } from "react-blurhash";
import { FaCalendar, FaClock, FaUser } from "react-icons/fa6";
import Markdown from "react-markdown";

type BannerProps = {
  banner: Banner;
};

const FeaturedBanner = (props: BannerProps) => {
  const banner = props.banner;
  const backgroundUrlRaw = banner.meta.background.split("?")[0];
  const fileType = backgroundUrlRaw.split(".").pop();
  const mediaType = fileType === "mp4" ? "video" : "image";

  const { data: queue } = useSuspenseQuery({
    queryKey: ["queue"],
    queryFn: queryInsights,
  });

  const extra_styles = banner.background === "generic";

  return (
    <div className="featured-event">
      <div className="background" style={banner.meta.background_styles}>
        <Blurhash hash={props.banner.meta.blurhash} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {mediaType === "video" && (
            <video
              src={banner.meta.background}
              autoPlay
              muted
              loop
              className="video"
            />
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
      </div>
      <div className="information">
        <span
          className="header"
          style={extra_styles ? banner.meta.headline_styles : {}}
        >
          {banner.build.season.name}
        </span>
        <h2
          className="title"
          style={extra_styles ? banner.meta.header_styles : {}}
        >
          {banner.header}
        </h2>
        <div
          className="description"
          style={extra_styles ? banner.meta.body_styles : {}}
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
