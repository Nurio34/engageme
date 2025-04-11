"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PostCommentLike } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const likeComment = async (
  commentId: string
): Promise<{
  status: "success" | "fail";
  postCommentLike?: PostCommentLike;
}> => {
  try {
    const user = await currentUser();
    if (!user) return { status: "fail" };

    const userId = user.id;

    const postCommentLike = await prisma.postCommentLike.create({
      data: { userId, commentId },
    });

    if (!postCommentLike) return { status: "fail" };

    return { status: "success", postCommentLike };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
