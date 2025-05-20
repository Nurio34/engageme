"use server";

import { prisma } from "@/lib/prisma";
import { PostLike } from "@prisma/client";
import { PrismaPostLikeNotificationType } from "../../../../../../prisma/types/notification";
import webPush from "web-push";

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
    const { authToken, pushToken, endpoint } =
      postLikeNotification.postLike.post.user;

    if (!authToken || !pushToken || !endpoint) return { status: "fail" };

    const subscription = {
      endpoint: endpoint,
      keys: {
        p256dh: pushToken,
        auth: authToken,
      },
    };

    const { name, avatar } = postLikeNotification.postLike.user;

    await webPush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Post Like",
        message: `${name} liked your post.`,
        icon: avatar,
      })
    );

    //! ***********************************

    return { status: "success", postLikeNotification };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
