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
  ReplyComment,
  ReplyCommentLike,
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
  replies: PrismaReplyCommentType[];
};

export type PrismaReplyCommentType = ReplyComment & {
  user: User;
  likes: ReplyCommentLike[];
};
