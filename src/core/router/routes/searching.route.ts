import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import LinearSearchPage from "@/features/algorithms/searching/view/LinearSearchPage";
import BinarySearchPage from "@/features/algorithms/searching/view/BinarySearchPage";

// Parent: /algorithms/searching
export const searchingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "algorithms/searching",
});

// Child routes
export const linearSearchRoute = createRoute({
  getParentRoute: () => searchingRoute,
  path: "linear",
  component: LinearSearchPage,
});

export const binarySearchRoute = createRoute({
  getParentRoute: () => searchingRoute,
  path: "binary",
  component: BinarySearchPage,
});
