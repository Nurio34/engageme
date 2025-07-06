"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaFollowNotification } from "../../../../../../../../../prisma/types/notification";

export const sendFollowNotification = async (
  userId: string,
  followId: string | undefined
): Promise<{
  status: "success" | "fail";
  followNotificaion?: PrismaFollowNotification;
}> => {
  if (!followId) return { status: "fail" };
  try {
    const user = await currentUser();
    if (!user) return { status: "fail" };

    const followNotificaion = await prisma.followNotification.create({
      data: { userId, followId },
      include: {
        user: true,
        follow: {
          include: {
            follower: {
              select: {
                userId: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
    if (!followNotificaion) return { status: "fail" };

    return { status: "success", followNotificaion };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
