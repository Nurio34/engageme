import { DeleteMediaType } from "@/actions/cloudinary";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isCreateModalOpen: boolean;
  isWannaCloseCreateModalOpen: boolean;
  cloudinaryMedias: DeleteMediaType[];
  posterImages: string[];
}

const initialState: ModalState = {
  isCreateModalOpen: false,
  isWannaCloseCreateModalOpen: false,
  cloudinaryMedias: [],
  posterImages: [],
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
    addCloudinaryMedias: (state, action: PayloadAction<DeleteMediaType[]>) => {
      state.cloudinaryMedias = action.payload;
    },

    addPosterImage: (state, action: PayloadAction<string>) => {
      state.posterImages.push(action.payload);
    },
    removePosterImage: (state, action: PayloadAction<string>) => {
      state.posterImages = state.posterImages.filter(
        (id) => id !== action.payload
      );
    },
    resterPosterImages: (state) => {
      state.posterImages = [];
    },
  },
});

export const {
  toggleCreateModal,
  toggle_WannaCloseCreateModal_Modal,
  addCloudinaryMedias,
  addPosterImage,
  removePosterImage,
  resterPosterImages,
} = modalsSlice.actions;
export default modalsSlice.reducer;
