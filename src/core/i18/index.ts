import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./locales/en/common.json";
import deCommon from "./locales/de/common.json";
import bnCommon from "./locales/bn/common.json";
import enMenu from "./locales/en/menu.json";
import deMenu from "./locales/de/menu.json";
import bnMenu from "./locales/bn/menu.json";
import enTodos from "@/features/todos/locales/en.json";
import deTodos from "@/features/todos/locales/de.json";
import bnTodos from "@/features/todos/locales/bn.json";
i18n.use(initReactI18next).init({
  resources: {
    en: {
      menu: enMenu,
      common: enCommon,
      todos: enTodos,
    },
    de: {
      menu: deMenu,
      common: deCommon,
      todos: deTodos,
    },
    bn: {
      menu: bnMenu,
      common: bnCommon,
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
