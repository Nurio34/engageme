import { Location, Media, Post, Settings, User } from "@prisma/client";

export type PrismaPostType = Post & {
  user: User;
  medias: Media[];
  location?: Location | null;
  settings?: Settings | null;
};
