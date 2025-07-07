"use server";

import { getPosts } from "@/app/api/post/posts/handler/getPosts";
import { PrismaPostType } from "../../../../../../../prisma/types/post";
import { getFollowingsPosts } from "@/app/api/post/followingsPosts/handler";
import { getFavoritesPosts } from "@/app/api/post/favoritesPosts/handler";
import { SkipType } from "@/store/slices/following";

export const getPostsAction = async (
  skip: SkipType,
  variant: string | undefined
): Promise<{ status: "fail" | "success"; posts: PrismaPostType[] }> => {
  try {
    const { postsSkip, followingsPostsSkip, favoritesPostsSkip } = skip;
    let postsState: PrismaPostType[] = [];
    let statusState: "success" | "fail" = "fail";

    if (!variant || variant === "home") {
      const { status, posts } = await getPosts(postsSkip);
      statusState = status;
      postsState = posts;
    }
    if (variant === "followings") {
      const { status, posts } = await getFollowingsPosts(followingsPostsSkip);
      statusState = status;
      postsState = posts;
    }
    if (variant === "favorites") {
      const { status, posts } = await getFavoritesPosts(favoritesPostsSkip);
      statusState = status;
      postsState = posts;
    }

    return { status: statusState, posts: postsState };
  } catch (error) {
    console.log(error);
    return { status: "fail", posts: [] };
  }
};
