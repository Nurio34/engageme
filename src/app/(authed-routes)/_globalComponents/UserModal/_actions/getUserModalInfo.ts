"use server";

import { prisma } from "@/lib/prisma";
import { UserModalType } from "../../../../../../prisma/types/userModal";

export const getUserModalInfo = async (
  userId: string
): Promise<{ status: "success" | "fail"; userInfo?: UserModalType }> => {
  console.log("getUserModalInfo");

  try {
    const userInfo = await prisma.user.findUnique({
      where: { userId },
      include: {
        _count: { select: { posts: true, following: true, followers: true } },
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
      },
    });

    if (!userInfo) return { status: "fail" };

    return { status: "success", userInfo };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
