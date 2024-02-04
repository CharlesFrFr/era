import { useGlobal } from "src/state/global";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryBuilds } from "src/external/wrapper";

import { motion } from "framer-motion";
import { FaDownload, FaRotate, FaCheck } from "react-icons/fa6";
import "src/styles/downloads.css";

const Downloads = () => {
  const downloadManager = useGlobal();
  const { data: builds } = useSuspenseQuery({
    queryKey: ["builds"],
    queryFn: queryBuilds,
  });

  const pub = builds.filter((build) => build.public);
  const other = builds
    .filter((build) => !build.public)
    .sort((a, b) => {
      if (a.season_number < b.season_number) return -1;
      if (a.season_number > b.season_number) return 1;
      return 0;
    });

  return (
    <div className="downloads-wrapper">
      <motion.section
        className="version-list"
        animate="visible"
        initial="hidden"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
        }}
      >
        <div className="divider">
          <hr />
          <p>Current Public Version</p>
          <hr />
        </div>

        {pub.map((build) => (
          <BuildDownload key={build.uuid} build={build} />
        ))}

        <div className="divider">
          <hr />
          <p>Other Builds</p>
          <hr />
        </div>

        {other.map((build) => (
          <BuildDownload key={build.uuid} build={build} />
        ))}
      </motion.section>
      <section className="download-status">
        {downloadManager.selectedDownload === "" ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="no-content"
          >
            <FaDownload />
            <h2>Not Downloading</h2>
          </motion.div>
        ) : (
          <DownloadSelected />
        )}
      </section>
    </div>
  );
};

type BuildProps = {
  build: Build;
};

const BuildDownload = (props: BuildProps) => {
  const downloadManager = useGlobal();

  return (
    <motion.div
      className="build"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
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
      <div className="buttons">
        {/* <button>
          <FaCheck />
          <span className="hidden">Installed</span>
        </button> */}
        <button
          onClick={() => downloadManager.setSelectedDownload(props.build.uuid)}
        >
          <FaDownload />
          <span className="hidden">Download</span>
        </button>
        {/* <button>
          <FaRotate />
          <span className="hidden">Verify</span>
        </button> */}
      </div>
    </motion.div>
  );
};

const DownloadSelected = () => {
  const downloadManager = useGlobal();
  const { data: builds } = useSuspenseQuery({
    queryKey: ["builds"],
    queryFn: queryBuilds,
  });

  if (downloadManager.selectedDownload === "") return null;
  const found = builds.find(
    (build) => build.uuid === downloadManager.selectedDownload
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="selected"
    >
      <div
        className="splash"
        style={{
          backgroundImage: `url(${found?.splash})`,
        }}
      />

      <div
        className="icon"
        style={{
          backgroundImage: `url(${found?.icon})`,
        }}
      />
      <div className="information">
        <h2>{found?.name}</h2>
        <p>{found?.build}</p>
      </div>
      <div className="tags">{found?.uuid}</div>
      <div className="buttons">
        <button>
          <FaCheck />
          <span className="hidden">Installed</span>
        </button>
        <button onClick={() => downloadManager.setSelectedDownload("")}>
          <FaDownload />
          <span className="hidden">Download</span>
        </button>
        <button>
          <FaRotate />
          <span className="hidden">Verify</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Downloads;
