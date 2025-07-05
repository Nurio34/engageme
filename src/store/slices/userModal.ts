import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Position {
  top: number;
  left: number;
}

interface UserModalState {
  isHovered: boolean;
  position: {
    top: number;
    left: number;
  };
  userModalTimeout: NodeJS.Timeout | null;
}

const initialState: UserModalState = {
  isHovered: false,
  position: {
    top: 0,
    left: 0,
  },
  userModalTimeout: null,
};

export const userModalSlice = createSlice({
  name: "userModal",
  initialState,
  reducers: {
    setIsHovered: (state, action: PayloadAction<boolean>) => {
      state.isHovered = action.payload;
    },
    setPosition: (state, action: PayloadAction<Position>) => {
      state.position = action.payload;
    },
    setUserModalTimeout: (state, action: PayloadAction<NodeJS.Timeout>) => {
      state.userModalTimeout = action.payload;
    },
    clearUserModalTimeout: (state) => {
      if (state.userModalTimeout) clearTimeout(state.userModalTimeout);
      state.userModalTimeout = null;
    },
  },
});

export const {
  setIsHovered,
  setPosition,
  setUserModalTimeout,
  clearUserModalTimeout,
} = userModalSlice.actions;
export default userModalSlice.reducer;
