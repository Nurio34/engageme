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
  likes: PrismaPostLikeType[];
  comments: PrismaPostCommentType[];
};

export type PrismaPostLikeType = PostLike & {
  user: User;
};

export type PrismaMediaType = Media & {
  poster: Poster | null;
  transformation: Transformation | null;
};

export type PrismaPostCommentType = PostComment & {
  user: User;
  likes: PrismaCommentLikeType[];
  replies: PrismaReplyCommentType[];
};

export type PrismaCommentLikeType = PostCommentLike & {
  user: User;
};

export type PrismaReplyCommentType = ReplyComment & {
  user: User;
  likes: PrismaReplyLikeType[];
};

export type PrismaReplyLikeType = ReplyCommentLike & {
  user: User;
};
