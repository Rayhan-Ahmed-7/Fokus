import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./locales/en/common.json";
import deCommon from "./locales/de/common.json";
import bnCommon from "./locales/bn/common.json";
import arCommon from "./locales/ar/common.json";

import enMenu from "./locales/en/menu.json";
import deMenu from "./locales/de/menu.json";
import bnMenu from "./locales/bn/menu.json";
import arMenu from "./locales/ar/menu.json";

import enTodos from "@/features/todos/locales/en.json";
import deTodos from "@/features/todos/locales/de.json";
import bnTodos from "@/features/todos/locales/bn.json";
import arTodos from "@/features/todos/locales/ar.json";

import enHome from "@/features/home/locales/en.json";
import deHome from "@/features/home/locales/de.json";
import bnHome from "@/features/home/locales/bn.json";
import arHome from "@/features/home/locales/ar.json";

i18n.use(initReactI18next).init({
  resources: {
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
  },
  lng: "en", // default language
  fallbackLng: "en",
  ns: ["menu", "common", "todos"], // namespaces (can extend with feature-based)
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
