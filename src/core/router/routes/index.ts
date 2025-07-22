import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import { todosRoute } from "./todos.route";

export const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => {},
});

export const routeTree = rootRoute.addChildren([todosRoute, notFoundRoute]);
