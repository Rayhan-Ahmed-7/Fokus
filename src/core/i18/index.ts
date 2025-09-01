import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./locales/en/common.json";
import deCommon from "./locales/de/common.json";
import enMenu from "./locales/en/menu.json";
import deMenu from "./locales/de/menu.json";
i18n.use(initReactI18next).init({
  resources: {
    en: {
      menu: enMenu,
      common: enCommon,
    },
    de: {
      menu: deMenu,
      common: deCommon,
    },
  },
  lng: "en", // default language
  fallbackLng: "en",
  ns: ["menu", "common"], // namespaces (can extend with feature-based)
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
