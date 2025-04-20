"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaPostCommentNotificationType } from "../../../../../prisma/types/notification";

export const sendPostCommentNotification = async (
  postOwnerId: string,
  commentId: string
): Promise<{
  status: "success" | "fail";
  postCommentNotification?: PrismaPostCommentNotificationType;
}> => {
  try {
    const user = await currentUser();
    if (!user) return { status: "fail" };

    const postCommentNotification = await prisma.postCommentNotification.create(
      {
        data: { userId: postOwnerId, commentId, type: "postComment" },
        include: {
          comment: { include: { user: true } },
        },
      }
    );

    if (!postCommentNotification)
      return { status: "fail", postCommentNotification };

    return { status: "success", postCommentNotification };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
