"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaReplyNotificationType } from "../../../../../prisma/types/notification";

export const sendReplyNotification = async (
  commentOwnerId: string,
  replyId: string
): Promise<{
  status: "success" | "fail";
  replyNotification?: PrismaReplyNotificationType;
}> => {
  console.log({ commentOwnerId, replyId });

  try {
    const user = await currentUser();
    if (!user) return { status: "fail" };

    const replyNotification = await prisma.replyCommentNotification.create({
      data: {
        userId: commentOwnerId,
        commentId: replyId,
        type: "replyComment",
      },
      include: {
        comment: {
          include: {
            postComment: {
              include: {
                post: true,
              },
            },
          },
        },
      },
    });

    if (!replyNotification) return { status: "fail" };

    return { status: "success", replyNotification };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
