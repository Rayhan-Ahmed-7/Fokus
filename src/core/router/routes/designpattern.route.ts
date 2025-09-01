import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";

import SingletonPage from "@/features/patterns/creational/singleton/view/SingletonPage";
import FactoryPage from "@/features/patterns/creational/factory/view/FactoryPage";
import AdapterPage from "@/features/patterns/structural/adapter/view/AdapterPage";
import DecoratorPage from "@/features/patterns/structural/decorator/view/DecoratorPage";
import ObserverPage from "@/features/patterns/behavioral/observer/view/ObserverPage";
import StrategyPage from "@/features/patterns/behavioral/strategy/view/StrategyPage";
import BuilderPage from "@/features/patterns/creational/builder/View/BuilderPage";

// Patterns parent
export const patternsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "patterns",
  staticData: {
    breadcrumb: "designPatterns",
  },
});

// Creational
export const creationalRoute = createRoute({
  getParentRoute: () => patternsRoute,
  path: "creational",
  staticData: {
    breadcrumb: "designPatterns.creational",
  },
});

export const singletonRoute = createRoute({
  getParentRoute: () => creationalRoute,
  path: "singleton",
  component: SingletonPage,
  staticData: {
    breadcrumb: "designPatterns.creational.singleton",
  },
});
export const builderRoute = createRoute({
  getParentRoute: () => creationalRoute,
  path: "builder",
  component: BuilderPage,
  staticData: {
    breadcrumb: "designPatterns.creational.builder",
  },
});

export const factoryRoute = createRoute({
  getParentRoute: () => creationalRoute,
  path: "factory",
  component: FactoryPage,
  staticData: {
    breadcrumb: "designPatterns.creational.factory",
  },
});

// Structural
export const structuralRoute = createRoute({
  getParentRoute: () => patternsRoute,
  path: "structural",
  staticData: {
    breadcrumb: "designPatterns.structural",
  },
});

export const adapterRoute = createRoute({
  getParentRoute: () => structuralRoute,
  path: "adapter",
  component: AdapterPage,
  staticData: {
    breadcrumb: "designPatterns.structural.adapter",
  },
});

export const decoratorRoute = createRoute({
  getParentRoute: () => structuralRoute,
  path: "decorator",
  component: DecoratorPage,
  staticData: {
    breadcrumb: "designPatterns.structural.decorator",
  },
});

// Behavioral
export const behavioralRoute = createRoute({
  getParentRoute: () => patternsRoute,
  path: "behavioral",
  staticData: {
    breadcrumb: "designPatterns.behavioral",
  },
});

export const observerRoute = createRoute({
  getParentRoute: () => behavioralRoute,
  path: "observer",
  component: ObserverPage,
  staticData: {
    breadcrumb: "designPatterns.behavioral.observer",
  },
});

export const strategyRoute = createRoute({
  getParentRoute: () => behavioralRoute,
  path: "strategy",
  component: StrategyPage,
  staticData: {
    breadcrumb: "designPatterns.behavioral.strategy",
  },
});
