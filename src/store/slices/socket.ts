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
    setSocket: (state, action: PayloadAction<Socket>) => {
      return {
        ...state,
        socket: action.payload, // replace whole state object
      };
    },

    clearSocket: () => ({
      socket: null,
    }),
  },
});

export const { setSocket, clearSocket } = socketSlice.actions;
export default socketSlice.reducer;
