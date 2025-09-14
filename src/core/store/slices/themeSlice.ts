import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_THEME, type Theme } from "../types/themeTypes";
import { dispatch } from "..";

interface ThemeState {
  current: Theme;
  direction: "ltr" | "rtl";
}

const initialState: ThemeState = {
  current: DEFAULT_THEME,
  direction: "ltr",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.current = action.payload;
    },
    setDirection: (state, action: PayloadAction<"ltr" | "rtl">) => {
      state.direction = action.payload;
      document.documentElement.dir = action.payload;
    },
  },
});

export const { setTheme, setDirection } = themeSlice.actions;
export const changeTheme = (theme: Theme) => {
  dispatch(setTheme(theme));
};
export const changeDirection = (dir: "ltr" | "rtl") => {
  dispatch(setDirection(dir));
};
const themeReducer = themeSlice.reducer;
export default themeReducer;
