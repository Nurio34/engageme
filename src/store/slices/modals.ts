import { DeleteMediaType } from "@/actions/cloudinary";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

type DeviceType = "mobile" | "tablet" | "desktop";

interface ModalState {
  device: DeviceType;
  isCreateModalOpen: boolean;
  isWannaCloseCreateModalOpen: boolean;
  cloudinaryMedias: DeleteMediaType[];
  posterImages: string[];
}

const initialState: ModalState = {
  device: "desktop",
  isCreateModalOpen: false,
  isWannaCloseCreateModalOpen: false,
  cloudinaryMedias: [],
  posterImages: [],
};

export const modalsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setDevice: (state, action: PayloadAction<DeviceType>) => {
      state.device = action.payload;
    },
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
  setDevice,
  toggleCreateModal,
  toggle_WannaCloseCreateModal_Modal,
  addCloudinaryMedias,
  addPosterImage,
  removePosterImage,
  resterPosterImages,
} = modalsSlice.actions;
export default modalsSlice.reducer;
