/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
}

const initialState: SocketState = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket(state, action: PayloadAction<Socket>) {
      // Create a new instance or copy the socket to avoid immutability issues
      if (!state.socket) state.socket = action.payload;
    },

    clearSocket(state) {
      state.socket = null;
    },
  },
});

export const { setSocket, clearSocket } = socketSlice.actions;
export default socketSlice.reducer;
