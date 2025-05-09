import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CurrentThemeType = "light" | "dark";

interface ThemeState {
  currentTheme: CurrentThemeType;
}

const initialState: ThemeState = {
  currentTheme: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<CurrentThemeType>) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
