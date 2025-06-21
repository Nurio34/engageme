import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SideMenuState {
  currentMenu: string | undefined;
  isDrawerMenuOpen: boolean;
}

const initialState: SideMenuState = {
  currentMenu: "home",
  isDrawerMenuOpen: false,
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {
    setCurrentMenu: (state, action: PayloadAction<string | undefined>) => {
      state.currentMenu = action.payload;

      if (action.payload === "search" || action.payload === "notifications")
        state.isDrawerMenuOpen = true;
      else state.isDrawerMenuOpen = false;
    },

    resetSidemenu: () => initialState,
  },
});

export const { setCurrentMenu, resetSidemenu } = sideMenuSlice.actions;
export default sideMenuSlice.reducer;
