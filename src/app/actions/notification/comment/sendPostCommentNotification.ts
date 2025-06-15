"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaPostCommentNotificationType } from "../../../../../prisma/types/notification";
import { pushNotification } from "@/app/(authed-routes)/_globalComponents/PushNotification/actions/pushNotification";

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
          comment: {
            include: { user: true, post: { include: { medias: true } } },
          },
        },
      }
    );

    if (!postCommentNotification)
      return { status: "fail", postCommentNotification };

    //! *** push notification ***

    const userId = postCommentNotification.comment.post.userId;
    const title = `${postCommentNotification.comment.user.name} commented to your post`;
    const message = `"${postCommentNotification.comment.comment}"`;
    await pushNotification(userId, title, message);

    //! ***

    return { status: "success", postCommentNotification };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
