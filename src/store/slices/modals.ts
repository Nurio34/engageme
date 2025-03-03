import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isCreateModalOpen: boolean;
  isWannaCloseCreateModalOpen: boolean;
}

const initialState: ModalState = {
  isCreateModalOpen: false,
  isWannaCloseCreateModalOpen: false,
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
    toggle_WannaCloseCreateModal_Modal: (state) => {
      state.isWannaCloseCreateModalOpen = !state.isWannaCloseCreateModalOpen;
    },
  },
});

export const { toggleCreateModal, toggle_WannaCloseCreateModal_Modal } =
  modalsSlice.actions;
export default modalsSlice.reducer;
