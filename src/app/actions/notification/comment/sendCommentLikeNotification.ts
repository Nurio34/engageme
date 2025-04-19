"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PostCommentLikeNotification } from "@prisma/client";

export const sendCommentLikeNotification = async (
  commentOwnerId: string,
  commentLikeId: string
): Promise<{
  status: "success" | "fail";
  postCommentLikeNotification?: PostCommentLikeNotification;
}> => {
  try {
    const user = await currentUser();
    if (!user) return { status: "fail" };

    const postCommentLikeNotification =
      await prisma.postCommentLikeNotification.create({
        data: { userId: commentOwnerId, commentLikeId, type: "commentLike" },
      });

    if (!postCommentLikeNotification) return { status: "fail" };

    return { status: "success", postCommentLikeNotification };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
