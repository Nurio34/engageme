"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaReplyNotificationType } from "../../../../../prisma/types/notification";
import { pushNotification } from "@/app/(authed-routes)/_globalComponents/PushNotification/actions/pushNotification";

export const sendReplyNotification = async (
  commentOwnerId: string,
  replyId: string
): Promise<{
  status: "success" | "fail";
  replyNotification?: PrismaReplyNotificationType;
}> => {
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
            user: true,
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
    });

    if (!replyNotification) return { status: "fail" };

    //! *** push notification
    const userId = replyNotification.userId;
    const title = `${replyNotification.comment.user.name} replied to your comment`;
    const message = `"${replyNotification.comment.comment}"`;
    await pushNotification(userId, title, message);

    return { status: "success", replyNotification };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
