import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FollowingState {
  followings: string[];
}

const initialState: FollowingState = {
  followings: [],
};

export const followingSlice = createSlice({
  name: "following",
  initialState,
  reducers: {
    addToFollowing: (state, action: PayloadAction<string>) => {
      if (!state.followings.includes(action.payload)) {
        state.followings.push(action.payload);
      }
    },
    deleteFromFollowing: (state, action: PayloadAction<string>) => {
      state.followings = state.followings.filter((f) => f !== action.payload);
    },
  },
});

export const { addToFollowing, deleteFromFollowing } = followingSlice.actions;
export default followingSlice.reducer;
