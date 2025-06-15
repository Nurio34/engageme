"use server";

import { getPosts } from "@/app/api/post/handler/getPosts";
import { PrismaPostType } from "../../../../../../../prisma/types/post";

export const getPostsAction = async (
  skip: number
): Promise<{ status: "fail" | "success"; posts: PrismaPostType[] }> => {
  try {
    const { status, posts } = await getPosts(skip);

    return { status, posts };
  } catch (error) {
    console.log(error);
    return { status: "fail", posts: [] };
  }
};
