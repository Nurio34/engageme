import { MediaType } from "@prisma/client";

export type User = {
  name: string;
  avatar: string;
  userId: string;
};

export type MediaInterface = {
  type: MediaType;
  url: string;
};

export type NotificationTypeInterface =
  | "postLikeNotification"
  | "postCommentNotification"
  | "commentLikeNotification"
  | "replyNotification"
  | "replyLikeNotification"
  | "followNotification";

export type VariantType = "like" | "comment" | "follow";

export type NotificationType = {
  postId?: string;
  users: User[];
  post?: string;
  createdAt: Date;
  type: NotificationTypeInterface;
  media?: MediaInterface;
  comment?: string;
  commentId?: string;
  isFollowed?: boolean;
};

export type CatagorizedNotificationType = {
  time: "new" | "yesterday" | "this week" | "this month" | "earlier";
  notifications: NotificationType[];
};

export const initialCatagorizedNotifications = [
  {
    time: "new",
    notifications: [],
  },
  {
    time: "yesterday",
    notifications: [],
  },
  {
    time: "this week",
    notifications: [],
  },
  {
    time: "this month",
    notifications: [],
  },
  {
    time: "earlier",
    notifications: [],
  },
];
