"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import {
  PrismaFollowNotification,
  PrismaPostCommentLikeNotificationType,
  PrismaPostCommentNotificationType,
  PrismaPostLikeNotificationType,
  PrismaReplyLikeNotificationType,
  PrismaReplyNotificationType,
} from "../../../../prisma/types/notification";

export const markSeenAllUnseenNotifications = async (
  userId: string,
  postLikeNotifications?: PrismaPostLikeNotificationType[],
  postCommentNotifications?: PrismaPostCommentNotificationType[],
  postCommentLikeNotifications?: PrismaPostCommentLikeNotificationType[],
  replyCommentNotifications?: PrismaReplyNotificationType[],
  replyCommentLikeNotifications?: PrismaReplyLikeNotificationType[],
  followNotifications?: PrismaFollowNotification[]
) => {
  try {
    const user = await currentUser();
    if (!user) return;
    if (user.id !== userId) return;

    const updates = [];

    if (postLikeNotifications && postLikeNotifications.length > 0) {
      updates.push(
        prisma.postLikeNotification.updateMany({
          where: {
            id: { in: postLikeNotifications.map((n) => n.id) },
            isSeen: false,
          },
          data: { isSeen: true },
        })
      );
    }

    if (postCommentNotifications && postCommentNotifications.length > 0) {
      updates.push(
        prisma.postCommentNotification.updateMany({
          where: {
            id: { in: postCommentNotifications.map((n) => n.id) },
            isSeen: false,
          },
          data: { isSeen: true },
        })
      );
    }

    if (
      postCommentLikeNotifications &&
      postCommentLikeNotifications.length > 0
    ) {
      updates.push(
        prisma.postCommentLikeNotification.updateMany({
          where: {
            id: { in: postCommentLikeNotifications.map((n) => n.id) },
            isSeen: false,
          },
          data: { isSeen: true },
        })
      );
    }

    if (replyCommentNotifications && replyCommentNotifications.length > 0) {
      updates.push(
        prisma.replyCommentNotification.updateMany({
          where: {
            id: { in: replyCommentNotifications.map((n) => n.id) },
            isSeen: false,
          },
          data: { isSeen: true },
        })
      );
    }

    if (
      replyCommentLikeNotifications &&
      replyCommentLikeNotifications.length > 0
    ) {
      updates.push(
        prisma.replyCommentLikeNotification.updateMany({
          where: {
            id: { in: replyCommentLikeNotifications.map((n) => n.id) },
            isSeen: false,
          },
          data: { isSeen: true },
        })
      );
    }
    if (followNotifications && followNotifications.length > 0) {
      updates.push(
        prisma.followNotification.updateMany({
          where: {
            id: { in: followNotifications.map((n) => n.id) },
            isSeen: false,
          },
          data: { isSeen: true },
        })
      );
    }

    await prisma.$transaction(updates);
  } catch (error) {
    console.log(error);
  } finally {
    // revalidateTag("notifications");
  }
};
