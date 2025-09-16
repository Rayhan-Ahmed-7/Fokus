import enCommon from "./en/common.json";
import deCommon from "./de/common.json";
import bnCommon from "./bn/common.json";
import saCommon from "./sa/common.json";

import enMenu from "./en/menu.json";
import deMenu from "./de/menu.json";
import bnMenu from "./bn/menu.json";
import saMenu from "./sa/menu.json";

import enTodos from "@/features/todos/locales/en.json";
import deTodos from "@/features/todos/locales/de.json";
import bnTodos from "@/features/todos/locales/bn.json";
import saTodos from "@/features/todos/locales/sa.json";

import enHome from "@/features/home/locales/en.json";
import deHome from "@/features/home/locales/de.json";
import bnHome from "@/features/home/locales/bn.json";
import saHome from "@/features/home/locales/sa.json";

export const resources = {
  "ar-SA": {
    menu: saMenu,
    common: saCommon,
    home: saHome,
    todos: saTodos,
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
