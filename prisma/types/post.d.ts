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
  likes: PostLike[];
  comments: PrismaPostCommentType[];
};

export type PrismaMediaType = Media & {
  poster: Poster | null;
  transformation: Transformation | null;
};

export type PrismaPostCommentType = PostComment & {
  user: User;
  likes: PostCommentLike[];
};
