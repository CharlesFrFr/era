import { Outlet } from "@tanstack/react-router";
import Drawer from "src/app/drawer";

import "src/styles/app.css";

const AppPage = () => {
  return (
    <section className="app">
      <Drawer />
      <div className="children">
        <Outlet />
      </div>
    </section>
  );
};

export default AppPage;
