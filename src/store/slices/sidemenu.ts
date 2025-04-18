import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SideMenuState {
  currentMenu: string;
  isDrawerMenuOpen: boolean;
}

const initialState: SideMenuState = {
  currentMenu: "",
  isDrawerMenuOpen: false,
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {
    setCurrentMenu: (state, action: PayloadAction<string>) => {
      state.currentMenu = action.payload;

      if (action.payload === "search" || action.payload === "notifications")
        state.isDrawerMenuOpen = true;
      else state.isDrawerMenuOpen = false;
    },
  },
});

export const { setCurrentMenu } = sideMenuSlice.actions;
export default sideMenuSlice.reducer;
