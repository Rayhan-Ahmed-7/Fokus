import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import HomePage from "@/features/home/view/HomePage";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
