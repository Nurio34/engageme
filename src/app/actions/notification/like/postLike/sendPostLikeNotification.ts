"use server";

import { prisma } from "@/lib/prisma";
import { PostLike } from "@prisma/client";
import { PrismaPostLikeNotificationType } from "../../../../../../prisma/types/notification";

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
          include: { user: true, post: { include: { medias: true } } },
        },
      },
    });

    if (!postLikeNotification) return { status: "fail" };

    return { status: "success", postLikeNotification };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
