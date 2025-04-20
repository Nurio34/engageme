import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PrismaPostCommentLikeNotificationType,
  PrismaPostCommentNotificationType,
  PrismaPostLikeNotificationType,
  PrismaReplyLikeNotificationType,
  PrismaReplyNotificationType,
} from "../../../prisma/types/notification";

interface NotificationsState {
  postLikeNotifications: PrismaPostLikeNotificationType[];
  postCommentNotifications: PrismaPostCommentNotificationType[];
  postCommentLikeNotifications: PrismaPostCommentLikeNotificationType[];
  replyCommentNotifications: PrismaReplyNotificationType[];
  replyCommentLikeNotifications: PrismaReplyLikeNotificationType[];
}

const initialState: NotificationsState = {
  postLikeNotifications: [],
  postCommentNotifications: [],
  postCommentLikeNotifications: [],
  replyCommentNotifications: [],
  replyCommentLikeNotifications: [],
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
    setPostCommentLikeNotifications: (
      state,
      action: PayloadAction<PrismaPostCommentLikeNotificationType[]>
    ) => {
      state.postCommentLikeNotifications = action.payload;
    },
    seReplyCommentNotifications: (
      state,
      action: PayloadAction<PrismaReplyNotificationType[]>
    ) => {
      state.replyCommentNotifications = action.payload;
    },
    seReplyCommentLikeNotifications: (
      state,
      action: PayloadAction<PrismaReplyLikeNotificationType[]>
    ) => {
      state.replyCommentLikeNotifications = action.payload;
    },
  },
});

export const {
  setPostLikeNotifications,
  setPostCommentNotifications,
  setPostCommentLikeNotifications,
  seReplyCommentNotifications,
  seReplyCommentLikeNotifications,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
