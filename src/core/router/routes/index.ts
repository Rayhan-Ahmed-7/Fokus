import { rootRoute } from "./root.route";
import { todosRoute } from "./todos.route";
import { gamesRoute, ticTacToeRoute } from "./games.route";
import { homeRoute } from "./home.route";
import {
  algorithmsRoute,
  bubbleSortRoute,
  insertionSortRoute,
  mergeSortRoute,
  quickSortRoute,
  selectionSortRoute,
  sortingRoute,
} from "./sorting.route";
import {
  binarySearchRoute,
  linearSearchRoute,
  searchingRoute,
} from "./searching.route";
import { dsaRoute, graphRoute, queueRoute, stackRoute } from "./dsa.route";
import {
  adapterRoute,
  behavioralRoute,
  creationalRoute,
  decoratorRoute,
  factoryRoute,
  observerRoute,
  patternsRoute,
  singletonRoute,
  strategyRoute,
  structuralRoute,
} from "./designpattern.route";

export const routeTree = rootRoute.addChildren([
  homeRoute,
  todosRoute,
  algorithmsRoute.addChildren([
    sortingRoute.addChildren([
      bubbleSortRoute,
      selectionSortRoute,
      insertionSortRoute,
      mergeSortRoute,
      quickSortRoute,
    ]),
    searchingRoute.addChildren([linearSearchRoute, binarySearchRoute]),
  ]),
  dsaRoute.addChildren([stackRoute, queueRoute, graphRoute]),
  patternsRoute.addChildren([
    creationalRoute.addChildren([singletonRoute, factoryRoute]),
    structuralRoute.addChildren([adapterRoute, decoratorRoute]),
    behavioralRoute.addChildren([observerRoute, strategyRoute]),
  ]),
  gamesRoute.addChildren([ticTacToeRoute]),
]);
