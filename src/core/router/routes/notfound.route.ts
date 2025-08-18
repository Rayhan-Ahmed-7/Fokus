import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";

export const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => {},
});
