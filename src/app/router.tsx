import {
  Route,
  RootRoute,
  NotFoundRoute,
  Router,
  Navigate,
  Outlet,
} from "@tanstack/react-router";
import { useFrontend } from "src/state/frontend";
import { useMe } from "src/state/me";
import { useSocket } from "src/state/socket";
import { useServers } from "src/state/servers";

import TauriFrame from "src/app/frame";
import Drawer from "src/app/drawer";
import Advert from "src/app/advert";

import Downloads from "src/pages/downloads";
import Home from "src/pages/home";
import Library from "src/pages/library";
import Servers from "src/pages/servers";
import Shop from "src/pages/shop";
import Developer from "src/pages/developer";

const rootRoute = new RootRoute({
  component: function RootRoute() {
    return (
      <TauriFrame>
        <Outlet />
        Hello World
      </TauriFrame>
    );
  },
});

const appRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: () => (
    <section className="app">
      <Drawer />
      <div className="children page">
        <Advert />
        <div className="children">
          <Outlet />
        </div>
      </div>
    </section>
  ),
  beforeLoad: async () => {
    const frontend = useFrontend.getState();
    const user = useMe.getState();
    const servers = useServers.getState();
    const socket = useSocket.getState();

    !frontend.loaded && (await frontend.load());
    !user.loaded && (await user.load());
    !servers.loaded && (await servers.load());
    !socket.sockets.has("main") && (await socket.connectMain());
    !socket.sockets.has("server") && (await socket.connectServer());
  },
});

const downloadsRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/downloads",
  component: Downloads,
});

const homeRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/home",
  component: Home,
});

const libraryRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/library",
  component: Library,
});

const serversRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/servers",
  component: Servers,
});

const shopRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/shop",
  component: Shop,
});

const developerRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/developer",
  component: Developer,
});

const tree = rootRoute.addChildren([
  appRoute.addChildren([
    homeRoute,
    libraryRoute,
    shopRoute,
    serversRoute,
    downloadsRoute,
    developerRoute,
  ]),
]);

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <Navigate to="/app/home" />,
});

const router = new Router({
  routeTree: tree,
  notFoundRoute,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
