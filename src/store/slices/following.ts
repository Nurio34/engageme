import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SkipType {
  postsSkip: number;
  followingsPostsSkip: number;
  favoritesPostsSkip: number;
}

interface FollowingState {
  followings: string[];
  favorites: string[];
  skip: SkipType;
  deletedComments: { postId: string; commentId: string }[];
  deletedReplies: string[];
}

const initialState: FollowingState = {
  followings: [],
  favorites: [],
  skip: {
    postsSkip: 1,
    followingsPostsSkip: 1,
    favoritesPostsSkip: 1,
  },
  deletedComments: [],
  deletedReplies: [],
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
    addFavorites: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    deleteFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((f) => f !== action.payload);
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

    setDeletedComments: (
      state,
      action: PayloadAction<{ postId: string; commentId: string }>
    ) => {
      state.deletedComments.push(action.payload);
    },
    removeFromDeletedComments: (
      state,
      action: PayloadAction<{ postId: string; commentId: string }>
    ) => {
      const { postId, commentId } = action.payload;
      state.deletedComments = state.deletedComments.filter(
        (comment) =>
          comment.postId !== postId || comment.commentId !== commentId
      );
    },

    setDeletedReplies: (state, action: PayloadAction<string>) => {
      state.deletedReplies.push(action.payload);
    },
    removeFromDeletedReplies: (state, action: PayloadAction<string>) => {
      state.deletedReplies = state.deletedReplies.filter(
        (reply) => reply !== action.payload
      );
    },

    resetFollowings: () => initialState,
  },
});

export const {
  addToFollowing,
  deleteFromFollowing,
  addFavorites,
  deleteFromFavorites,
  setSkip,
  resetSkip,
  setDeletedComments,
  removeFromDeletedComments,
  setDeletedReplies,
  removeFromDeletedReplies,
  resetFollowings,
} = followingSlice.actions;
export default followingSlice.reducer;
