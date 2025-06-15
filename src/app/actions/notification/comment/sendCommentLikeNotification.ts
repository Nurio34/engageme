"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaPostCommentLikeNotificationType } from "../../../../../prisma/types/notification";
import { pushNotification } from "@/app/(authed-routes)/_globalComponents/PushNotification/actions/pushNotification";

export const sendCommentLikeNotification = async (
  commentOwnerId: string,
  commentLikeId: string
): Promise<{
  status: "success" | "fail";
  postCommentLikeNotification?: PrismaPostCommentLikeNotificationType;
}> => {
  try {
    const user = await currentUser();
    if (!user) return { status: "fail" };

    const postCommentLikeNotification =
      await prisma.postCommentLikeNotification.create({
        data: { userId: commentOwnerId, commentLikeId, type: "commentLike" },
        include: {
          commentLike: {
            include: {
              user: true,
              comment: {
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

    if (!postCommentLikeNotification) return { status: "fail" };

    //! *** push notification ***
    const userId = postCommentLikeNotification.commentLike.comment.userId;
    const tittle = `${postCommentLikeNotification.commentLike.user.name} liked your comment`;
    const message = `"${postCommentLikeNotification.commentLike.comment.comment}"`;
    await pushNotification(userId, tittle, message);

    return { status: "success", postCommentLikeNotification };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
