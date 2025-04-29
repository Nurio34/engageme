import {
  Media,
  Post,
  PostComment,
  PostCommentLike,
  PostCommentLikeNotification,
  PostCommentNotification,
  PostLike,
  PostLikeNotification,
  ReplyComment,
  ReplyCommentLike,
  ReplyCommentLikeNotification,
  ReplyCommentNotification,
  User,
} from "@prisma/client";

export type PrismaPostLikeNotificationType = PostLikeNotification & {
  postLike: PostLike & {
    user: User;
    post: Post & {
      medias: Media[];
    };
  };
};

export type PrismaPostCommentNotificationType = PostCommentNotification & {
  comment: PostComment & {
    user: User;
  };
};

export type PrismaPostCommentLikeNotificationType =
  PostCommentLikeNotification & {
    commentLike: PostCommentLike & {
      user: User;
      comment: PostComment;
    };
  };

export type PrismaReplyNotificationType = ReplyCommentNotification & {
  comment: ReplyComment & {
    user: User;
    postComment: PostComment;
  };
};

export type PrismaReplyLikeNotificationType = ReplyCommentLikeNotification & {
  commentLike: ReplyCommentLike & {
    user: User;
    comment: ReplyComment & {
      postComment: PostComment;
    };
  };
};

export type AllNotificationsType = {
  postLikeNotifications: PrismaPostLikeNotificationType[];
  postCommentNotifications: PrismaPostCommentNotificationType[];
  postCommentLikeNotifications: PrismaPostCommentLikeNotificationType[];
  replyCommentNotifications: PrismaReplyNotificationType[];
  replyCommentLikeNotifications: PrismaReplyLikeNotificationType[];
};
