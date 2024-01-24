import { Link } from "@tanstack/react-router";

import * as Icons from "react-icons/fa6";
import "src/styles/drawer.css";

const Drawer = () => {
  return (
    <aside className="drawer">
      <DrawerItem label="Home" icon="FaHouse" path="/app/home" />
      <DrawerItem label="Library" icon="FaFolder" path="/app/library" />
      <DrawerItem label="Shop" icon="FaCartShopping" path="/app/shop" />
      <DrawerItem label="Servers" icon="FaServer" path="/app/servers" />
      <DrawerItem label="Downloads" icon="FaDownload" path="/app/downloads" />
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
    </Link>
  );
};

export default Drawer;
