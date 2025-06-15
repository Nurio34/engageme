"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaReplyLikeNotificationType } from "../../../../../prisma/types/notification";
import { pushNotification } from "@/app/(authed-routes)/_globalComponents/PushNotification/actions/pushNotification";

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

    //! *** push notification ***
    const userId = replyLikeNotification.userId;
    const title = `${replyLikeNotification.commentLike.user.name} liked your reply`;
    const message = `"${replyLikeNotification.commentLike.comment.comment}"`;
    await pushNotification(userId, title, message);

    return { status: "success", replyLikeNotification };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
