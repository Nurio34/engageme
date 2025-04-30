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
    post: Post & {
      medias: Media[];
    };
  };
};

export type PrismaPostCommentLikeNotificationType =
  PostCommentLikeNotification & {
    commentLike: PostCommentLike & {
      user: User;
      comment: PostComment & {
        post: Post & {
          medias: Media[];
        };
      };
    };
  };

export type PrismaReplyNotificationType = ReplyCommentNotification & {
  comment: ReplyComment & {
    user: User;
    postComment: PostComment & {
      post: Post & {
        medias: Media[];
      };
    };
  };
};

export type PrismaReplyLikeNotificationType = ReplyCommentLikeNotification & {
  commentLike: ReplyCommentLike & {
    user: User;
    comment: ReplyComment & {
      postComment: PostComment & {
        post: Post & {
          medias: Media[];
        };
      };
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
