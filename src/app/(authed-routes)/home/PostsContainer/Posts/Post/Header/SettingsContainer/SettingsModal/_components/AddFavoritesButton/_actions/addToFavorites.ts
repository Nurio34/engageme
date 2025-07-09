"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";

export const addToFavorites = async (
  userId: string
): Promise<{ status: "success" | "fail"; msg: string }> => {
  try {
    const user = await currentUser();
    if (!user)
      return {
        status: "fail",
        msg: "You have to sign in to add to favorites!",
      };

    const response = await prisma.favorite.create({
      data: {
        userId: user.id,
        favoriteId: userId,
      },
    });
    if (!response)
      return {
        status: "fail",
        msg: "Something went wrong while adding to favorites. Please try again!",
      };

    return { status: "success", msg: "Success" };
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      msg: "Unexpected error while adding to favorites. Please try again!",
    };
  } finally {
    revalidateTag("posts");
    revalidateTag("followingsPosts");
    revalidateTag("favoritesPosts");
  }
};
