import { configureStore } from "@reduxjs/toolkit";
import modalsSlice from "./slices/modals";
import pingSlice from "./slices/ping";
import routingSlice from "./slices/routing";

export const store = configureStore({
  reducer: {
    modals: modalsSlice,
    ping: pingSlice,
    routing: routingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
