"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const removeLike = async (
  commentId: string
): Promise<{ status: "success" | "fail" }> => {
  try {
    const user = await currentUser();
    if (!user) return { status: "fail" };

    const userId = user.id;

    const response = await prisma.postCommentLike.delete({
      where: { userId_commentId: { userId, commentId } },
    });
    if (!response) return { status: "fail" };

    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
