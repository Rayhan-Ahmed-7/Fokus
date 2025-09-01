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
  staticData: {
    breadcrumb: "algorithms",
  },
});

// Parent: /algorithms/sorting
export const sortingRoute = createRoute({
  getParentRoute: () => algorithmsRoute,
  path: "sorting",
  staticData: {
    breadcrumb: "algorithms.sorting",
  },
});

// Child routes: /algorithms/sorting/*
export const bubbleSortRoute = createRoute({
  getParentRoute: () => sortingRoute,
  path: "bubble",
  component: BubbleSortPage,
  staticData: {
    breadcrumb: "algorithms.sorting.bubble",
  },
});

export const selectionSortRoute = createRoute({
  getParentRoute: () => sortingRoute,
  path: "selection",
  component: SelectionSortPage,
  staticData: {
    breadcrumb: "algorithms.sorting.selection",
  },
});

export const insertionSortRoute = createRoute({
  getParentRoute: () => sortingRoute,
  path: "insertion",
  component: InsertionSortPage,
  staticData: {
    breadcrumb: "algorithms.sorting.insertion",
  },
});

export const mergeSortRoute = createRoute({
  getParentRoute: () => sortingRoute,
  path: "merge",
  component: MergeSortPage,
  staticData: {
    breadcrumb: "algorithms.sorting.merge",
  },
});

export const quickSortRoute = createRoute({
  getParentRoute: () => sortingRoute,
  path: "quick",
  component: QuickSortPage,
  staticData: {
    breadcrumb: "algorithms.sorting.quick",
  },
});
