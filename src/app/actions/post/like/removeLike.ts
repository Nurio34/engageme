"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const removeLike = async (
  postId: string
): Promise<{ status: "success" | "fail" }> => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) return { status: "fail" };

  try {
    const response = await prisma.postLike.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    if (!response) return { status: "fail" };

    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
