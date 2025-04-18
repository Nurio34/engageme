import {
  Post,
  PostComment,
  PostCommentNotification,
  PostLike,
  PostLikeNotification,
  User,
} from "@prisma/client";

export type PrismaPostLikeNotificationType = PostLikeNotification & {
  postLike: PostLike & {
    user: User;
    post: Post;
  };
};

export type PrismaPostCommentNotificationType = PostCommentNotification & {
  comment: PostComment & {
    user: User;
    post: Post;
  };
};

export type AllNotificationsType = {
  postLikeNotifications: PrismaPostLikeNotificationType[];
  postCommentNotifications: PrismaPostCommentNotificationType[];
};

// postLikeNotifications: {
//   include: {
//     user: true,
//     postLike: true,
//   },
// },
// postCommentNotifications: {
//   include: {
//     user: true,
//     comment: true,
//   },
// },
