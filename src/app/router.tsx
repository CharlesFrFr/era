import {
  RootRoute,
  Router,
  NotFoundRoute,
  Navigate,
  Outlet,
  Route,
} from "@tanstack/react-router";

import TauriFrame from "src/app/frame";
import AppPage from "src/pages/app";

const rootRoute = new RootRoute({
  component: function RootRoute() {
    return (
      <TauriFrame>
        <Outlet />
      </TauriFrame>
    );
  },
});

const appRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: AppPage,
});

const testAppRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/home",
  component: () => <div>Page 2</div>,
});

const tree = rootRoute.addChildren([appRoute.addChildren([testAppRoute])]);

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <Navigate to="/app" />,
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
