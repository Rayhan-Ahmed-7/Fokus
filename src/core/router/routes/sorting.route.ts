import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";

// Sorting pages
import BubbleSortPage from "@/features/algorithms/sorting/view/BubbleSortPage";
import SelectionSortPage from "@/features/algorithms/sorting/view/SelectionSortPage";
import InsertionSortPage from "@/features/algorithms/sorting/view/InsertionSortPage";
import MergeSortPage from "@/features/algorithms/sorting/view/MergeSortPage";
import QuickSortPage from "@/features/algorithms/sorting/view/QuickSortPage";

// Parent: /algorithms
export const algorithmsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "algorithms",
});

// Parent: /algorithms/sorting
export const sortingRoute = createRoute({
  getParentRoute: () => algorithmsRoute,
  path: "sorting",
});

// Child routes: /algorithms/sorting/*
export const bubbleSortRoute = createRoute({
  getParentRoute: () => sortingRoute,
  path: "bubble",
  component: BubbleSortPage,
});

export const selectionSortRoute = createRoute({
  getParentRoute: () => sortingRoute,
  path: "selection",
  component: SelectionSortPage,
});

export const insertionSortRoute = createRoute({
  getParentRoute: () => sortingRoute,
  path: "insertion",
  component: InsertionSortPage,
});

export const mergeSortRoute = createRoute({
  getParentRoute: () => sortingRoute,
  path: "merge",
  component: MergeSortPage,
});

export const quickSortRoute = createRoute({
  getParentRoute: () => sortingRoute,
  path: "quick",
  component: QuickSortPage,
});
