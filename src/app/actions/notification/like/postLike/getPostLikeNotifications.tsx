"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PostLikeNotification } from "@prisma/client";

export const getPostLikeNotifications = async (): Promise<{
  status: "success" | "fail";
  postLikeNotifications?: PostLikeNotification[];
}> => {
  try {
    const user = await currentUser();
    if (!user) return { status: "fail" };

    const postLikeNotifications = await prisma.postLikeNotification.findMany({
      where: { userId: user.id },
    });

    if (!postLikeNotifications) return { status: "fail" };

    return { status: "success", postLikeNotifications };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
