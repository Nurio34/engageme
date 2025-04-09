import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PostModalType = {
  postId: string;
  isOpen: boolean;
};

interface HomePageState {
  postModal: PostModalType;
}

const initialState: HomePageState = {
  postModal: {
    postId: "",
    isOpen: false,
  },
};

export const homePageSlice = createSlice({
  name: "ping",
  initialState,
  reducers: {
    setPostModal: (state, action: PayloadAction<PostModalType>) => {
      state.postModal = action.payload;
    },
  },
});

export const { setPostModal } = homePageSlice.actions;
export default homePageSlice.reducer;
