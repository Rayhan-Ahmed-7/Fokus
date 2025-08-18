import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import StackPage from "@/features/dsa/stack/view/StackPage";
import QueuePage from "@/features/dsa/queue/view/QueuePage";
import GraphPage from "@/features/dsa/graph/view/GraphPage";

// DSA parent
export const dsaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "dsa",
});

// Children
export const stackRoute = createRoute({
  getParentRoute: () => dsaRoute,
  path: "stack",
  component: StackPage,
});

export const queueRoute = createRoute({
  getParentRoute: () => dsaRoute,
  path: "queue",
  component: QueuePage,
});

export const graphRoute = createRoute({
  getParentRoute: () => dsaRoute,
  path: "graph",
  component: GraphPage,
});
