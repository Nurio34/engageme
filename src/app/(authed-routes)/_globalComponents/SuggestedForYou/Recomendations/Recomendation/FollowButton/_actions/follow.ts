"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";

export const follow = async (
  userId: string
): Promise<{ status: "success" | "fail"; msg: string; id?: string }> => {
  try {
    const user = await currentUser();
    if (!user)
      return { status: "fail", msg: "You have to sign in to follow people!" };

    const { id } = user;

    if (id === userId)
      return { status: "fail", msg: "Self service not allowed!" };

    const follow = await prisma.follow.create({
      data: { followerId: id, followingId: userId },
    });
    if (!follow)
      return {
        status: "fail",
        msg: "Something went wrong while following! Please try again..",
      };

    return { status: "success", msg: "Success", id: follow.id };
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      msg: "Unexpected error while following! Please try again..",
    };
  } finally {
    revalidateTag("posts");
    revalidateTag("followingsPosts");
    revalidateTag("favoritesPosts");
    revalidateTag("recomendations");
  }
};
