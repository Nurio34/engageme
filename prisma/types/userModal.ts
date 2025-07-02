import { Media, Post, User } from "@prisma/client";

export type UserModalType = User & {
  _count: {
    posts: number;
    following: number;
    followers: number;
  };
  posts: (Post & {
    medias: Media[];
  })[];
};
