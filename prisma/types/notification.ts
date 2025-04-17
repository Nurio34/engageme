import { Post, PostLike, PostLikeNotification, User } from "@prisma/client";

export type PrismaPostNotification = PostLikeNotification & {
  user: User;
  postLike: PostLike & {
    user: User;
    post: Post;
  };
};
