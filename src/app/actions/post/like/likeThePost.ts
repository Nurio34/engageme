"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PostLike } from "@prisma/client";

export const likeThePost = async (
  postId: string
): Promise<{ status: "fail" | "success"; postLike?: PostLike }> => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) return { status: "fail" };

  try {
    const postLike = await prisma.postLike.create({ data: { userId, postId } });

    if (!postLike) return { status: "fail" };

    return { status: "success", postLike };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
