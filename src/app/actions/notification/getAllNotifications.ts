"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { AllNotificationsType } from "../../../../prisma/types/notification";

export const getAllNotifications = async (): Promise<{
  status: "success" | "fail";
  allNotifications?: AllNotificationsType;
}> => {
  try {
    const user = await currentUser();
    if (!user) return { status: "fail" };

    const allNotifications = await prisma.user.findUnique({
      where: { userId: user.id },
      select: {
        postLikeNotifications: {
          include: {
            postLike: {
              include: {
                user: true,
                post: true,
              },
            },
          },
        },
        postCommentNotifications: {
          include: {
            comment: {
              include: {
                user: true,
                post: true,
              },
            },
          },
        },
      },
    });

    if (!allNotifications) return { status: "fail" };

    return { status: "success", allNotifications };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
