"use server";

import { prisma } from "@/lib/prisma";
import { UserModalType } from "../../../../../../prisma/types/userModal";
import { currentUser } from "@clerk/nextjs/server";

export const getUserModalInfo = async (
  userId: string
): Promise<{
  status: "success" | "fail";
  userInfo?: UserModalType;
}> => {
  console.log("getUserModalInfo");

  try {
    const user = await currentUser();

    const viewerId = user?.id;

    const userInfo = await prisma.user.findUnique({
      where: { userId },
      include: {
        _count: {
          select: {
            posts: true,
            following: true,
            followers: true,
          },
        },
        posts: {
          include: {
            medias: {
              take: 1,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 3,
        },
        followers: viewerId
          ? {
              where: {
                followerId: viewerId,
              },
              select: {
                followerId: true,
              },
              take: 1,
            }
          : false,
      },
    });

    if (!userInfo) return { status: "fail" };

    return {
      status: "success",
      userInfo: userInfo as unknown as UserModalType, // Cast if needed
    };
  } catch (error) {
    console.error(error);
    return { status: "fail" };
  }
};
