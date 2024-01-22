import { Link, useNavigate } from "@tanstack/react-router";

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
    </aside>
  );
};

type DrawerItemProps = {
  label: string;
  icon: keyof typeof Icons;
  path: string;
};

const DrawerItem = (props: DrawerItemProps) => {
  const navigate = useNavigate();
  const Icon = Icons[props.icon];

  const handleClick = () => {
    navigate({
      to: props.path,
    });
  };

  return (
    <Link className="item" onClick={handleClick}>
      <div className="icon">
        <Icon />
      </div>
      <span className="text">{props.label}</span>
    </Link>
  );
};

export default Drawer;
