import { configureStore } from "@reduxjs/toolkit";
import modalsSlice from "./slices/modals";
import pingSlice from "./slices/ping";
import routingSlice from "./slices/routing";
import homePageSlice from "./slices/homePage";
import userSlice from "./slices/user";
import sideMenuSlice from "./slices/sidemenu";
import notificationsSlice from "./slices/notifications";

export const store = configureStore({
  reducer: {
    modals: modalsSlice,
    ping: pingSlice,
    routing: routingSlice,
    homePage: homePageSlice,
    user: userSlice,
    sideMenu: sideMenuSlice,
    notifications: notificationsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
