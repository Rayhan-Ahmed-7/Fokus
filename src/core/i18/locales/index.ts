import enCommon from "./en/common.json";
import deCommon from "./de/common.json";
import bnCommon from "./bn/common.json";
import saCommon from "./sa/common.json";
import jaCommon from "./ja/common.json";
import cnCommon from "./cn/common.json";

import enMenu from "./en/menu.json";
import deMenu from "./de/menu.json";
import bnMenu from "./bn/menu.json";
import saMenu from "./sa/menu.json";
import jaMenu from "./ja/menu.json";
import cnMenu from "./cn/menu.json";

import enTodos from "@/features/todos/locales/en.json";
import deTodos from "@/features/todos/locales/de.json";
import bnTodos from "@/features/todos/locales/bn.json";
import saTodos from "@/features/todos/locales/sa.json";
import jaTodos from "@/features/todos/locales/ja.json";
import cnTodos from "@/features/todos/locales/cn.json";

import enHome from "@/features/home/locales/en.json";
import deHome from "@/features/home/locales/de.json";
import bnHome from "@/features/home/locales/bn.json";
import saHome from "@/features/home/locales/sa.json";
import jaHome from "@/features/home/locales/ja.json";
import cnHome from "@/features/home/locales/cn.json";

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
  ja: {
    menu: jaMenu,
    common: jaCommon,
    home: jaHome,
    todos: jaTodos,
  },
  "zh-Hans-CN-u-nu-hanidec": {
    menu: cnMenu,
    common: cnCommon,
    home: cnHome,
    todos: cnTodos,
  },
};
