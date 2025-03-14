import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PingState {
  lastPing: number;
}

const initialState: PingState = {
  lastPing: 0,
};

export const pingSlice = createSlice({
  name: "ping",
  initialState,
  reducers: {
    saveLastPingTime: (state, action: PayloadAction<number>) => {
      state.lastPing = action.payload;
    },
  },
});

export const { saveLastPingTime } = pingSlice.actions;
export default pingSlice.reducer;
