import { Outlet } from "@tanstack/react-router";

import Drawer from "src/app/drawer";
import VersionBanner from "src/app/banner";

import "src/styles/app.css";

const AppPage = () => {
  return (
    <section className="app">
      <Drawer />
      <div className="children page">
        <VersionBanner />
        <Outlet />
      </div>
    </section>
  );
};

export default AppPage;
