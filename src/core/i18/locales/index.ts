import enCommon from "./en/common.json";
import deCommon from "./de/common.json";
import bnCommon from "./bn/common.json";
import arCommon from "./ar/common.json";

import enMenu from "./en/menu.json";
import deMenu from "./de/menu.json";
import bnMenu from "./bn/menu.json";
import arMenu from "./ar/menu.json";

import enTodos from "@/features/todos/locales/en.json";
import deTodos from "@/features/todos/locales/de.json";
import bnTodos from "@/features/todos/locales/bn.json";
import arTodos from "@/features/todos/locales/ar.json";

import enHome from "@/features/home/locales/en.json";
import deHome from "@/features/home/locales/de.json";
import bnHome from "@/features/home/locales/bn.json";
import arHome from "@/features/home/locales/ar.json";

export const resources = {
  ar: {
    menu: arMenu,
    common: arCommon,
    home: arHome,
    todos: arTodos,
  },
  en: {
    menu: enMenu,
    common: enCommon,
    home: enHome,
    todos: enTodos,
  },
  de: {
    menu: deMenu,
    common: deCommon,
    home: deHome,
    todos: deTodos,
  },
  bn: {
    menu: bnMenu,
    common: bnCommon,
    home: bnHome,
    todos: bnTodos,
  },
};
