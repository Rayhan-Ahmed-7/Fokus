import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import NotFoundPage from "@/components/NotFound/NotFound";

export const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFoundPage,
});
