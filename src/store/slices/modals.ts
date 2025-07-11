import { DeleteMediaType } from "@/actions/cloudinary";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DeviceTypeType = "mobile" | "tablet" | "desktop";

export type DeviceType = {
  type: DeviceTypeType;
  width: number;
  height: number;
};

interface ModalState {
  variant?: string;
  device: DeviceType;
  isCreateModalOpen: boolean;
  isWannaCloseCreateModalOpen: boolean;
  cloudinaryMedias: DeleteMediaType[];
  posterImages: string[];
  isPickerOpen: boolean;
  isMoreModalOpen: boolean;
  isSwitchAppearanceModalOpen: boolean;
  isPostSettingsModalOpen: boolean;
  isSuggestedForYouModalOpen: boolean;
}

const initialState: ModalState = {
  variant: undefined,
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
  isSwitchAppearanceModalOpen: false,
  isPostSettingsModalOpen: false,
  isSuggestedForYouModalOpen: false,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setVariant: (state, action: PayloadAction<string | undefined>) => {
      state.variant = action.payload;
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
    toggleSwitchAppearanceModal: (state) => {
      state.isSwitchAppearanceModalOpen = !state.isSwitchAppearanceModalOpen;
    },
    togglePostSettingsModal: (state) => {
      state.isPostSettingsModalOpen = !state.isPostSettingsModalOpen;
    },
    closePostSettingsModal: (state) => {
      state.isPostSettingsModalOpen = false;
    },
    toggleSuggestedForYouModalOpen: (state) => {
      state.isSuggestedForYouModalOpen = !state.isSuggestedForYouModalOpen;
    },

    resetModals: () => initialState,
  },
});

export const {
  setVariant,
  setDevice,
  toggleCreateModal,
  toggle_WannaCloseCreateModal_Modal,
  addCloudinaryMedias,
  addPosterImage,
  removePosterImage,
  resterPosterImages,
  togglePicker,
  toggleMoreModal,
  toggleSwitchAppearanceModal,
  togglePostSettingsModal,
  closePostSettingsModal,
  toggleSuggestedForYouModalOpen,
  resetModals,
} = modalsSlice.actions;
export default modalsSlice.reducer;
