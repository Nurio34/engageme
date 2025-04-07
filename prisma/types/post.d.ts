import {
  Location,
  Media,
  Post,
  Poster,
  Settings,
  Transformation,
  User,
  PostLike,
} from "@prisma/client";

export type PrismaPostType = Post & {
  user: User;
  medias: PrismaMediaType[];
  location?: Location | null;
  settings?: Settings | null;
  likes: PostLike[];
};

export type PrismaMediaType = Media & {
  poster: Poster | null;
  transformation: Transformation | null;
};
