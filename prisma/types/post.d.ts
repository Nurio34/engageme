import {
  Location,
  Media,
  Post,
  Poster,
  Settings,
  Transformation,
  User,
  PostLike,
  PostComment,
  PostCommentLike,
} from "@prisma/client";

export type PrismaPostType = Post & {
  user: User;
  medias: PrismaMediaType[];
  location?: Location | null;
  settings?: Settings | null;
};

export type PrismaMediaType = Media & {
  poster: Poster | null;
  transformation: Transformation | null;
};

export type PrismaPostComment_WithLikes_withUser = PostComment & {
  likes: PostCommentLike[];
  user: User;
};
