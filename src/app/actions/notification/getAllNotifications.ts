"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaPostLikeNotification } from "../../../../prisma/types/notification";

export const getAllNotifications = async (): Promise<{
  status: "success" | "fail";
  allNotifications?: PrismaPostLikeNotification[][];
}> => {
  try {
    const user = await currentUser();
    if (!user) return { status: "fail" };

    const postLikeNotifications = prisma.postLikeNotification.findMany({
      where: { userId: user.id },
      include: {
        user: true,
        postLike: {
          include: {
            user: true,
            post: true,
          },
        },
      },
    });

    const allNotifications = await prisma.$transaction([postLikeNotifications]);

    return { status: "success", allNotifications };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
