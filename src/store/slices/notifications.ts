import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PrismaFollowNotification,
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
  followNotifications: PrismaFollowNotification[];
}

const initialState: NotificationsState = {
  postLikeNotifications: [],
  postCommentNotifications: [],
  postCommentLikeNotifications: [],
  replyCommentNotifications: [],
  replyCommentLikeNotifications: [],
  followNotifications: [],
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
      if (
        state.postLikeNotifications.some(
          (notification) =>
            notification.postLike.postId === action.payload.postLike.postId &&
            notification.postLike.userId === action.payload.postLike.userId
        )
      )
        return;
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
      if (
        state.postCommentLikeNotifications.some(
          (notification) =>
            notification.commentLike.commentId ===
              action.payload.commentLike.commentId &&
            notification.commentLike.userId ===
              action.payload.commentLike.userId
        )
      )
        return;
      state.postCommentLikeNotifications.push(action.payload);
    },
    setReplyCommentNotifications: (
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
    setReplyCommentLikeNotifications: (
      state,
      action: PayloadAction<PrismaReplyLikeNotificationType[]>
    ) => {
      state.replyCommentLikeNotifications = action.payload;
    },
    addReplyLikeNotification: (
      state,
      action: PayloadAction<PrismaReplyLikeNotificationType>
    ) => {
      if (
        state.replyCommentLikeNotifications.some(
          (notification) =>
            notification.commentLike.commentId ===
              action.payload.commentLike.commentId &&
            notification.commentLike.userId ===
              action.payload.commentLike.userId
        )
      )
        return;
      state.replyCommentLikeNotifications.push(action.payload);
    },

    setFollowNotifications: (
      state,
      action: PayloadAction<PrismaFollowNotification[]>
    ) => {
      state.followNotifications = action.payload;
    },
    addFollowNotification: (
      state,
      action: PayloadAction<PrismaFollowNotification>
    ) => {
      state.followNotifications.push(action.payload);
    },
    resetNotifications: () => initialState,
  },
});

export const {
  setPostLikeNotifications,
  addPostLikeNotification,
  setPostCommentNotifications,
  addPostCommentNotification,
  setPostCommentLikeNotifications,
  addCommentLikeNotification,
  setReplyCommentNotifications,
  addReplyNotification,
  setReplyCommentLikeNotifications,
  addReplyLikeNotification,
  setFollowNotifications,
  addFollowNotification,
  resetNotifications,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
