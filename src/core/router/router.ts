import { notFoundRoute } from "./routes/notfound.route";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes/index";
export const router = createRouter({
  routeTree,
  notFoundRoute,
});
