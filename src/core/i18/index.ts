import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ICU from "i18next-icu";

import { store } from "../store";
import { resources } from "./locales";

const initialLang = store.getState().theme.language || "en";
i18n
  .use(initReactI18next)
  .use(ICU)
  .init({
    resources: resources,
    lng: initialLang, // default language
    fallbackLng: {
      default: ["en"],
    },
    ns: ["menu", "common", "todos"], // namespaces (can extend with feature-based)
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
