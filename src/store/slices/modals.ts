import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isCreateModalOpen: boolean;
}

const initialState: ModalState = {
  isCreateModalOpen: false,
};

export const modalsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    //increment: (state) => {
    //  state.value += 1;
    //},
    //incrementByAmount: (state, action: PayloadAction<number>) => {
    //  state.value += action.payload;
    //}
    toggleCreateModal: (state) => {
      state.isCreateModalOpen = !state.isCreateModalOpen;
    },
  },
});

export const { toggleCreateModal } = modalsSlice.actions;
export default modalsSlice.reducer;
