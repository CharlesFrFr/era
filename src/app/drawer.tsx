import { useServers } from "src/state/servers";

import { Link } from "@tanstack/react-router";
import * as Icons from "react-icons/fa6";
import "src/styles/drawer.css";

const Drawer = () => {
  const servers = useServers((state) => state.servers);
  const filtered = Object.values(Object.fromEntries(servers)).filter(
    (server) => server.status === "online" && !server.private
  );
  return (
    <aside className="drawer">
      <DrawerItem label="Home" icon="FaHouse" path="/app/home" />
      {/* <DrawerItem label="Library" icon="FaFolder" path="/app/library" />
      <DrawerItem
        label="Shop"
        icon="FaCartShopping"
        path="/app/shop"
        // info={{
        //   style: "fire",
        //   message: "NEW",
        // }}
      />
      <DrawerItem label="Downloads" icon="FaDownload" path="/app/downloads" /> */}
      <DrawerItem
        label="Servers"
        icon="FaServer"
        path="/app/servers"
        info={{
          style: "servers",
          message: filtered.length.toString(),
        }}
      />
      <DrawerItem
        label="Developer"
        icon="FaWandMagicSparkles"
        path="/app/developer"
      />
    </aside>
  );
};

type DrawerItemProps = {
  label: string;
  icon: keyof typeof Icons;
  path: string;
  info?: {
    style: string;
    message: string;
  };
};

const DrawerItem = (props: DrawerItemProps) => {
  const Icon = Icons[props.icon];

  return (
    <Link
      className="item"
      to={props.path}
      activeProps={{
        className: "item now",
      }}
      style={
        props.path === "/app/developer"
          ? {
              marginTop: "auto",
            }
          : {}
      }
    >
      <div className="icon">
        <Icon />
      </div>
      <span className="text">{props.label}</span>
      {props.info && (
        <span className={`info ${props.info.style}`}>{props.info.message}</span>
      )}
    </Link>
  );
};

export default Drawer;
