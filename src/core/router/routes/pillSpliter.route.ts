import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import PillSpliter from "@/features/canvas/view/PillSpliter";
export const pillSpliterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "pill-spliter",
  component: PillSpliter,
  staticData: {
    breadcrumb: "Pill Spliter",
  },
});
