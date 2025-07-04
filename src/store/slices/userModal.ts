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
}

const initialState: UserModalState = {
  isHovered: false,
  position: {
    top: 0,
    left: 0,
  },
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
  },
});

export const { setIsHovered, setPosition } = userModalSlice.actions;
export default userModalSlice.reducer;
