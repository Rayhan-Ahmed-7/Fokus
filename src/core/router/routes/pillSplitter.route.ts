import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import PillSplitter from "@/features/canvas/view/PillSplitter";
export const pillSplitterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "pill-splitter",
  component: PillSplitter,
  staticData: {
    breadcrumb: "pillSplitter",
  },
});
