"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaPostLikeType } from "../../../../../prisma/types/post";

export const likeThePost = async (
  postId: string
): Promise<{
  status: "fail" | "success";
  message: string;
  postLike?: PrismaPostLikeType;
}> => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId)
    return { status: "fail", message: "You have to sign in to like posts!" };

  try {
    const postLike = await prisma.postLike.create({
      data: { userId, postId },
      include: { user: true },
    });
    console.log({ postLike });

    if (!postLike)
      return {
        status: "fail",
        message:
          "Something went wrong while liking the post ! Please try again...",
      };

    return {
      status: "success",
      message: "Success",
      postLike,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      message:
        "Something went wrong while liking the post ! Please try again...",
    };
  }
};
