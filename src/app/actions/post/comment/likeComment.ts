"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const likeComment = async (
  commentId: string
): Promise<{ status: "success" | "fail" }> => {
  console.log(commentId);

  try {
    const user = await currentUser();
    if (!user) return { status: "fail" };

    const userId = user.id;

    const response = await prisma.postCommentLike.create({
      data: { userId, commentId },
    });

    if (!response) return { status: "fail" };

    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
