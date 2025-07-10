import {
  EditedMedia,
  LocationType,
  SettingsType,
} from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostEdit {
  isEditing: boolean;
  postId: string;
  mediasToEdit: EditedMedia[];
  message: string;
  location: LocationType;
  settings: SettingsType;
}

const initialState: PostEdit = {
  isEditing: false,
  postId: "",
  mediasToEdit: [],
  message: "",
  location: { id: "", name: "" },
  settings: { isCountsVisible: false, isCommentingAllowed: false },
};

export const postEditSlice = createSlice({
  name: "postEdit",
  initialState,
  reducers: {
    toggleIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    setPostId: (state, action: PayloadAction<string>) => {
      state.postId = action.payload;
    },
    setMediasToEdit: (state, action: PayloadAction<EditedMedia[]>) => {
      state.mediasToEdit = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setLocation: (state, action: PayloadAction<LocationType>) => {
      state.location = action.payload;
    },
    setSettings: (state, action: PayloadAction<SettingsType>) => {
      state.settings = action.payload;
    },
  },
});

export const {
  toggleIsEditing,
  setPostId,
  setMediasToEdit,
  setMessage,
  setLocation,
  setSettings,
} = postEditSlice.actions;
export default postEditSlice.reducer;
