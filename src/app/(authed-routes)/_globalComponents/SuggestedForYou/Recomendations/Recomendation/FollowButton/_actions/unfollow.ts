"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const unfollow = async (
  userId: string
): Promise<{ status: "success" | "fail"; msg: string }> => {
  try {
    const user = await currentUser();
    if (!user)
      return { status: "fail", msg: "You have to sign in to unfollow people!" };

    const { id } = user;

    const response = await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: id,
          followingId: userId,
        },
      },
    });

    if (!response) {
      return {
        status: "fail",
        msg: "You are not following this user or already unfollowed.",
      };
    }

    return { status: "success", msg: "Unfollowed successfully." };
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      msg: "Unexpected error while unfollowing! Please try again..",
    };
  }
};
