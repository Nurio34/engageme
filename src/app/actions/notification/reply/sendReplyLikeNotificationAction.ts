"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaReplyLikeNotificationType } from "../../../../../prisma/types/notification";

export const sendReplyLikeNotification = async (
  repliedUserId: string,
  commentLikeId: string
): Promise<{
  status: "success" | "fail";
  replyLikeNotification?: PrismaReplyLikeNotificationType;
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
          commentLike: {
            include: {
              user: true,
              comment: {
                include: {
                  postComment: {
                    include: {
                      post: {
                        include: {
                          medias: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

    if (!replyLikeNotification) return { status: "fail" };

    return { status: "success", replyLikeNotification };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
