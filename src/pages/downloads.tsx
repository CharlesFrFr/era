import { useGlobal } from "src/state/global";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryBuilds } from "src/external/wrapper";

import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa6";
import "src/styles/downloads.css";
import BuildDownload from "src/app/build";

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
        {downloadManager.selectedDownload === "" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="no-content"
          >
            <FaDownload />
            <h2>Not Downloading</h2>
          </motion.div>
        )}
        <DownloadSelected />
      </section>
    </div>
  );
};

const DownloadSelected = () => {
  const downloadManager = useGlobal();
  const { data: builds } = useSuspenseQuery({
    queryKey: ["builds"],
    queryFn: queryBuilds,
  });

  const found = builds.find(
    (build) => build.uuid === downloadManager.selectedDownload
  );
  if (!found) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="selected-build"
      key={downloadManager.selectedDownload}
    >
      <div
        className="icon"
        style={{
          backgroundImage: `url(${found?.icon})`,
        }}
      />
      <div className="infos">
        <h2 className="name">{found.name}</h2>
        <p className="info">{found.build}</p>
      </div>
      <div className="download">
        <button>Download ({found.size})</button>
      </div>
    </motion.div>
  );
};

export default Downloads;
