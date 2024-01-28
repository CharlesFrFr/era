import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryServers } from "src/external/wrapper";
import { AnimatePresence, motion } from "framer-motion";

import { FaUser } from "react-icons/fa6";
import "src/styles/servers.css";

const Servers = () => {
  const { data: servers } = useSuspenseQuery({
    queryKey: ["server"],
    queryFn: queryServers,
  });
  const filtered = Object.values(servers).filter(
    (server) => server.status === "online" && !server.private
  );

  const open = filtered.filter((server) => server.accepting_players);
  const closed = filtered.filter((server) => !server.accepting_players);

  return (
    <AnimatePresence>
      <div className="servers-wrapper">
        <div className="servers-container">
          <header>Joinable</header>
          <motion.div
            className="servers"
            animate="visible"
            initial="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
            }}
          >
            {open.length > 0
              ? open.map((server) => (
                  <Server server={server} key={server.uuid} />
                ))
              : null}
          </motion.div>
        </div>

        <div className="servers-container gradient">
          <header>In Progress</header>
          <motion.div
            className="servers"
            animate="visible"
            initial="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {open.length > 0
              ? closed.map((server) => (
                  <Server server={server} key={server.uuid} />
                ))
              : null}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

type ServerProps = {
  server: Server;
};

const Server = ({ server }: ServerProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="server"
    >
      <h2>{server.name}</h2>
      <div className="progress">
        <div
          className="progress-bar"
          style={{
            width: `${(server.number_of_players / server.max_players) * 100}%`,
          }}
        />
      </div>
      <div className="tag">
        <FaUser />
        <span>{server.number_of_players}</span>
      </div>
      <small>
        {server.build.name} • {server.uuid}
      </small>
    </motion.div>
  );
};

export default Servers;
