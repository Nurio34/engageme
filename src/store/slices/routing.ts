import { createSlice } from "@reduxjs/toolkit";

interface RoutingState {
  isRouting: boolean;
}

const initialState: RoutingState = {
  isRouting: true,
};

export const routingSlice = createSlice({
  name: "ping",
  initialState,
  reducers: {
    started: (state) => {
      state.isRouting = true;
    },
    ended: (state) => {
      state.isRouting = false;
    },
  },
});

export const { started, ended } = routingSlice.actions;
export default routingSlice.reducer;
