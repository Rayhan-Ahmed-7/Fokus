import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_THEME, type Theme } from '../types/themeTypes';

interface ThemeState {
  current: Theme;
}

const initialState: ThemeState = {
  current: DEFAULT_THEME,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.current = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
const themeReducer = themeSlice.reducer;
export default themeReducer;