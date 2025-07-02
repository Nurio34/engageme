"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const follow = async (
  userId: string
): Promise<{ status: "success" | "fail"; msg: string }> => {
  try {
    const user = await currentUser();
    if (!user)
      return { status: "fail", msg: "You have to sign in to follow people!" };

    const { id } = user;
    const response = await prisma.follow.create({
      data: { followerId: id, followingId: userId },
    });
    if (!response)
      return {
        status: "fail",
        msg: "Something went wrong while following! Please try again..",
      };
    console.log({ response });

    return { status: "success", msg: "Success" };
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      msg: "Unexpected error while following! Please try again..",
    };
  }
};
