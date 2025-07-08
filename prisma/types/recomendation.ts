import { Follow, Media, Post } from "@prisma/client";

export type PrismaRecomendationType = {
  userId: string;
  name: string;
  avatar: string | null;
  fullname: string | null;
  _count: {
    posts: number;
    following: number;
    followers: number;
  };
  posts: (Post & {
    medias: Media[];
  })[];
  followers: { followerId: string }[];
};
