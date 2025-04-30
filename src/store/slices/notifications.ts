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
    addPostLikeNotification: (
      state,
      action: PayloadAction<PrismaPostLikeNotificationType>
    ) => {
      state.postLikeNotifications.push(action.payload);
    },
    setPostCommentNotifications: (
      state,
      action: PayloadAction<PrismaPostCommentNotificationType[]>
    ) => {
      state.postCommentNotifications = action.payload;
    },
    addPostCommentNotification: (
      state,
      action: PayloadAction<PrismaPostCommentNotificationType>
    ) => {
      state.postCommentNotifications.push(action.payload);
    },
    setPostCommentLikeNotifications: (
      state,
      action: PayloadAction<PrismaPostCommentLikeNotificationType[]>
    ) => {
      state.postCommentLikeNotifications = action.payload;
    },
    addCommentLikeNotification: (
      state,
      action: PayloadAction<PrismaPostCommentLikeNotificationType>
    ) => {
      state.postCommentLikeNotifications.push(action.payload);
    },
    seReplyCommentNotifications: (
      state,
      action: PayloadAction<PrismaReplyNotificationType[]>
    ) => {
      state.replyCommentNotifications = action.payload;
    },
    addReplyNotification: (
      state,
      action: PayloadAction<PrismaReplyNotificationType>
    ) => {
      state.replyCommentNotifications.push(action.payload);
    },
    seReplyCommentLikeNotifications: (
      state,
      action: PayloadAction<PrismaReplyLikeNotificationType[]>
    ) => {
      state.replyCommentLikeNotifications = action.payload;
    },
    addReplyLikeNotification: (
      state,
      action: PayloadAction<PrismaReplyLikeNotificationType>
    ) => {
      state.replyCommentLikeNotifications.push(action.payload);
    },
  },
});

export const {
  setPostLikeNotifications,
  addPostLikeNotification,
  setPostCommentNotifications,
  addPostCommentNotification,
  setPostCommentLikeNotifications,
  addCommentLikeNotification,
  seReplyCommentNotifications,
  addReplyNotification,
  seReplyCommentLikeNotifications,
  addReplyLikeNotification,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
