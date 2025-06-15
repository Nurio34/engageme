"use server";

import { prisma } from "@/lib/prisma";
import { PostLike } from "@prisma/client";
import { PrismaPostLikeNotificationType } from "../../../../../../prisma/types/notification";
import webPush from "web-push";
import { pushNotification } from "@/app/(authed-routes)/_globalComponents/PushNotification/actions/pushNotification";

webPush.setVapidDetails(
  `mailto:${process.env.EMAIL_USER}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export const sendPostLikeNotification = async (
  postLike: PostLike,
  postOwnerId: string
): Promise<{
  status: "success" | "fail";
  postLikeNotification?: PrismaPostLikeNotificationType;
}> => {
  try {
    const postLikeNotification = await prisma.postLikeNotification.create({
      data: { userId: postOwnerId, postLikeId: postLike.id, type: "postLike" },
      include: {
        postLike: {
          include: {
            user: true,
            post: { include: { medias: true, user: true } },
          },
        },
      },
    });

    if (!postLikeNotification) return { status: "fail" };

    //! *** Push Notification ***
    const userId = postLikeNotification.postLike.post.user.userId;
    const title = `${postLikeNotification.postLike.user.name} liked your post`;
    const message = postLikeNotification.postLike.post.message;

    await pushNotification(userId, title, message);
    //! ***********************************

    return { status: "success", postLikeNotification };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
