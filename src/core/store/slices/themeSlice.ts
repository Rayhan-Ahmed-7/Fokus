import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Direction, type Language, type Theme } from "../types/themeTypes";
import { dispatch } from "..";
import { DEFAULT_THEME } from "../constants";

interface ThemeState {
  current: Theme;
  direction: Direction;
  language: Language;
}

const initialState: ThemeState = {
  current: DEFAULT_THEME,
  direction: "ltr",
  language: "en",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.current = action.payload;
    },
    setDirection: (state, action: PayloadAction<Direction>) => {
      state.direction = action.payload;
      document.documentElement.dir = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      document.documentElement.lang = action.payload;
    },
  },
});

export const { setTheme, setDirection, setLanguage } = themeSlice.actions;
export const changeTheme = (theme: Theme) => {
  dispatch(setTheme(theme));
};
export const changeDirection = (dir: Direction) => {
  dispatch(setDirection(dir));
};
export const changeLanguage = (lang: Language) => {
  dispatch(setLanguage(lang));
};
const themeReducer = themeSlice.reducer;
export default themeReducer;
