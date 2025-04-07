import {
  Location,
  Media,
  Post,
  Poster,
  Settings,
  Transformation,
  User,
} from "@prisma/client";

export type PrismaPostType = Post & {
  user: User;
  medias: PrismaMediaType[];
  location?: Location | null;
  settings?: Settings | null;
};

export type PrismaMediaType = Media & {
  poster: Poster;
  transformation: Transformation;
};
