"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { ReplyCommentLikeNotification } from "@prisma/client";

export const sendReplyLikeNotification = async (
  repliedUserId: string,
  commentLikeId: string
): Promise<{
  status: "success" | "fail";
  replyLikeNotification?: ReplyCommentLikeNotification;
}> => {
  try {
    const user = await currentUser();
    if (!user) return { status: "fail" };

    const replyLikeNotification =
      await prisma.replyCommentLikeNotification.create({
        data: {
          userId: repliedUserId,
          commentLikeId,
          type: "replyLike",
        },
        include: {
          user: true,
          commentLike: true,
        },
      });

    if (!replyLikeNotification) return { status: "fail" };

    return { status: "success", replyLikeNotification };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
