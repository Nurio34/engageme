import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SkipType {
  postsSkip: number;
  followingsPostsSkip: number;
  favoritesPostsSkip: number;
}

interface FollowingState {
  followings: string[];
  skip: SkipType;
}

const initialState: FollowingState = {
  followings: [],
  skip: {
    postsSkip: 1,
    followingsPostsSkip: 1,
    favoritesPostsSkip: 1,
  },
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

    setSkip: (state, action: PayloadAction<string | undefined>) => {
      const variant = action.payload;
      state.skip = {
        postsSkip:
          !variant || variant === "home"
            ? state.skip.postsSkip + 1
            : state.skip.postsSkip,
        followingsPostsSkip:
          variant === "followings"
            ? state.skip.followingsPostsSkip + 1
            : state.skip.followingsPostsSkip,
        favoritesPostsSkip:
          variant === "favorites"
            ? state.skip.favoritesPostsSkip + 1
            : state.skip.favoritesPostsSkip,
      };
    },

    resetSkip: (state) => {
      state.skip = {
        postsSkip: 1,
        followingsPostsSkip: 1,
        favoritesPostsSkip: 1,
      };
    },

    resetFollowings: () => initialState,
  },
});

export const {
  addToFollowing,
  deleteFromFollowing,
  setSkip,
  resetSkip,
  resetFollowings,
} = followingSlice.actions;
export default followingSlice.reducer;
