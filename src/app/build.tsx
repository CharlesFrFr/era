import { useGlobal } from "src/state/global";
import { motion } from "framer-motion";

import "src/styles/build.css";

type BuildProps = {
  build: Build;
};

const BuildDownload = (props: BuildProps) => {
  const downloadManager = useGlobal();

  return (
    <motion.div
      className={
        "build" +
        (props.build.uuid === downloadManager.selectedDownload
          ? " selected"
          : "")
      }
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      onClick={() => downloadManager.setSelectedDownload(props.build.uuid)}
    >
      <div
        className="splash"
        style={{
          backgroundImage: `url(${props.build.splash})`,
        }}
      />

      <div
        className="icon"
        style={{
          backgroundImage: `url(${props.build.icon})`,
        }}
      />
      <div className="information">
        <h2>{props.build.name}</h2>
        <p>{props.build.build}</p>
      </div>
      <div className="tags">{props.build.uuid}</div>
    </motion.div>
  );
};

export default BuildDownload;
