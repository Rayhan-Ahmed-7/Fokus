import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";

import SingletonPage from "@/features/patterns/creational/singleton/view/SingletonPage";
import FactoryPage from "@/features/patterns/creational/factory/view/FactoryPage";
import AdapterPage from "@/features/patterns/structural/adapter/view/AdapterPage";
import DecoratorPage from "@/features/patterns/structural/decorator/view/DecoratorPage";
import ObserverPage from "@/features/patterns/behavioral/observer/view/ObserverPage";
import StrategyPage from "@/features/patterns/behavioral/strategy/view/StrategyPage";

// Patterns parent
export const patternsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "patterns",
});

// Creational
export const creationalRoute = createRoute({
  getParentRoute: () => patternsRoute,
  path: "creational",
});

export const singletonRoute = createRoute({
  getParentRoute: () => creationalRoute,
  path: "singleton",
  component: SingletonPage,
});

export const factoryRoute = createRoute({
  getParentRoute: () => creationalRoute,
  path: "factory",
  component: FactoryPage,
});

// Structural
export const structuralRoute = createRoute({
  getParentRoute: () => patternsRoute,
  path: "structural",
});

export const adapterRoute = createRoute({
  getParentRoute: () => structuralRoute,
  path: "adapter",
  component: AdapterPage,
});

export const decoratorRoute = createRoute({
  getParentRoute: () => structuralRoute,
  path: "decorator",
  component: DecoratorPage,
});

// Behavioral
export const behavioralRoute = createRoute({
  getParentRoute: () => patternsRoute,
  path: "behavioral",
});

export const observerRoute = createRoute({
  getParentRoute: () => behavioralRoute,
  path: "observer",
  component: ObserverPage,
});

export const strategyRoute = createRoute({
  getParentRoute: () => behavioralRoute,
  path: "strategy",
  component: StrategyPage,
});
