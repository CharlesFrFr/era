import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryServers, queryUser } from "src/external/wrapper";

import { Link } from "@tanstack/react-router";
import * as Icons from "react-icons/fa6";
import "src/styles/drawer.css";

const Drawer = () => {
  const [show, set] = useState(false);
  const { data: servers } = useSuspenseQuery({
    queryKey: ["servers"],
    queryFn: queryServers,
  });
  const filtered = Object.values(servers).filter(
    (server) => server.status === "online" && !server.private
  );

  const { data: me } = useSuspenseQuery({
    queryKey: ["me"],
    queryFn: queryUser,
  });

  return (
    <aside className="drawer">
      <DrawerItem label="Home" icon="FaHouse" path="/app/home" />
      {/* <DrawerItem label="Library" icon="FaFolder" path="/app/library" />*/}
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
        label="Shop"
        icon="FaCartShopping"
        path="/app/shop"
        // info={{
        //   style: "fire",
        //   message: "NEW",
        // }}
      />
      <DrawerItem label="Downloads" icon="FaDownload" path="/app/downloads" />
      <DrawerItem
        label="Developer"
        icon="FaWandMagicSparkles"
        path="/app/developer"
      />
      <s />
      <div className="userarea">
        {show && (
          <div
            className="avatar"
            style={{
              backgroundImage: `url(${me.avatar})`,
            }}
          />
        )}
        <div className="info">
          <span className="username">{me.username}</span>
          <span
            className="role"
            style={{
              color: me.role.color,
            }}
          >
            {me.role.name}
          </span>
        </div>
      </div>
      <img
        style={{
          display: "none",
        }}
        src={me.avatar}
        onError={() => set(false)}
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
