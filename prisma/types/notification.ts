import {
  Post,
  PostComment,
  PostCommentNotification,
  PostLike,
  PostLikeNotification,
  ReplyComment,
  ReplyCommentLike,
  ReplyCommentNotification,
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

export type PrismaReplyNotificationType = ReplyCommentNotification & {
  comment: ReplyComment & {
    postComment: PostComment & {
      post: Post;
    };
  };
};

export type AllNotificationsType = {
  postLikeNotifications: PrismaPostLikeNotificationType[];
  postCommentNotifications: PrismaPostCommentNotificationType[];
};
