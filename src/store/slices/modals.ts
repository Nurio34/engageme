import { DeleteMediaType } from "@/actions/cloudinary";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeType = "light" | "dark";

type DeviceTypeType = "mobile" | "tablet" | "desktop";

export type DeviceType = {
  type: DeviceTypeType;
  width: number;
  height: number;
};

interface ModalState {
  theme: ThemeType;
  device: {
    type: DeviceTypeType;
    width: number;
    height: number;
  };
  isCreateModalOpen: boolean;
  isWannaCloseCreateModalOpen: boolean;
  cloudinaryMedias: DeleteMediaType[];
  posterImages: string[];
  isPickerOpen: boolean;
  isMoreModalOpen: boolean;
}

const initialState: ModalState = {
  theme: "light",
  device: {
    type: "desktop",
    width: 0,
    height: 0,
  },
  isCreateModalOpen: false,
  isWannaCloseCreateModalOpen: false,
  cloudinaryMedias: [],
  posterImages: [],
  isPickerOpen: false,
  isMoreModalOpen: false,
};

export const modalsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
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
    togglePicker: (state) => {
      state.isPickerOpen = !state.isPickerOpen;
    },
    toggleMoreModal: (state) => {
      state.isMoreModalOpen = !state.isMoreModalOpen;
    },
  },
});

export const {
  setTheme,
  setDevice,
  toggleCreateModal,
  toggle_WannaCloseCreateModal_Modal,
  addCloudinaryMedias,
  addPosterImage,
  removePosterImage,
  resterPosterImages,
  togglePicker,
  toggleMoreModal,
} = modalsSlice.actions;
export default modalsSlice.reducer;
