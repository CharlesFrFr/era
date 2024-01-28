import { useSuspenseQuery } from "@tanstack/react-query";
import { queryBuilds } from "src/external/wrapper";

import { FaDownload } from "react-icons/fa6";
import "src/styles/downloads.css";

const Downloads = () => {
  const { data: builds } = useSuspenseQuery({
    queryKey: ["downloads"],
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
      <section className="version-list">
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
      </section>
      <section className="download-status">
        <div className="no-content">
          <FaDownload />
          <h2>Not Downloading</h2>
        </div>
      </section>
    </div>
  );
};

type BuildProps = {
  build: Build;
};

const BuildDownload = (props: BuildProps) => {
  return (
    <div className="build">
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

      <div
        className="splash"
        style={{
          backgroundImage: `url(${props.build.splash})`,
        }}
      />
    </div>
  );
};

export default Downloads;
