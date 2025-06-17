"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaPostLikeType } from "../../../../../prisma/types/post";

export const likeThePost = async (
  postId: string
): Promise<{ status: "fail" | "success"; postLike?: PrismaPostLikeType }> => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) return { status: "fail" };

  try {
    const postLike = await prisma.postLike.create({
      data: { userId, postId },
      include: { user: true },
    });
    console.log({ postLike });

    if (!postLike) return { status: "fail" };

    return { status: "success", postLike };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
