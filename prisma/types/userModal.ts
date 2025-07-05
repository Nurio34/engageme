import { Follow, Media, Post, User } from "@prisma/client";

export type UserModalType = User & {
  _count: {
    posts: number;
    following: number;
    followers: number;
  };
  posts: (Post & {
    medias: Media[];
  })[];
  // This will only be present if currentUser is logged in
  followers?: Pick<Follow, "followingId">[]; // or just `Follow[]` if you want more fields
};
