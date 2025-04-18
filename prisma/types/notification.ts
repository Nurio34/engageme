import { Post, PostLike, PostLikeNotification, User } from "@prisma/client";

export type PrismaPostLikeNotification = PostLikeNotification & {
  user: User;
  postLike: PostLike & {
    user: User;
    post: Post;
  };
};

export type AllNotificationsType = PrismaPostLikeNotification[][];
