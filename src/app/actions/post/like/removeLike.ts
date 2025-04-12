"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PostLike } from "@prisma/client";

export const removeLike = async (
  postId: string
): Promise<{ status: "fail" | "success"; postLike?: PostLike }> => {
  const user = await currentUser();
  if (!user) return { status: "fail" };

  const userId = user.id;

  try {
    const postLike = await prisma.postLike.delete({
      where: { userId_postId: { userId, postId } },
    });
    if (!postLike) return { status: "fail" };

    return { status: "success", postLike };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
