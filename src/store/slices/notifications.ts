import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PrismaPostCommentNotificationType,
  PrismaPostLikeNotificationType,
} from "../../../prisma/types/notification";

interface NotificationsState {
  postLikeNotifications: PrismaPostLikeNotificationType[];
  postCommentNotifications: PrismaPostCommentNotificationType[];
}

const initialState: NotificationsState = {
  postLikeNotifications: [],
  postCommentNotifications: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setPostLikeNotifications: (
      state,
      action: PayloadAction<PrismaPostLikeNotificationType[]>
    ) => {
      state.postLikeNotifications = action.payload;
    },
    setPostCommentNotifications: (
      state,
      action: PayloadAction<PrismaPostCommentNotificationType[]>
    ) => {
      state.postCommentNotifications = action.payload;
    },
  },
});

export const { setPostLikeNotifications, setPostCommentNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
