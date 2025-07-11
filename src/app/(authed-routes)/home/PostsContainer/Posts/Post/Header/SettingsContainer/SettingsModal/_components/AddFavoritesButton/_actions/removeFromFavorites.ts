"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";

export const removeFromFavorites = async (
  userId: string,
  variant?: string
): Promise<{ status: "success" | "fail"; msg: string }> => {
  try {
    const user = await currentUser();
    if (!user)
      return {
        status: "fail",
        msg: "Fail",
      };

    const response = await prisma.favorite.delete({
      where: {
        userId_favoriteId: {
          userId: user.id,
          favoriteId: userId,
        },
      },
    });
    if (!response)
      return {
        status: "fail",
        msg: "Something went wrong while removing from favorites. Please try again!",
      };

    return { status: "success", msg: "Success" };
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      msg: "Unexpected error while removing from favorites. Please try again!",
    };
  } finally {
    if (variant === "favorites") {
      revalidateTag("favoritesPosts");
    }
    // revalidateTag("posts");
    // revalidateTag("followingsPosts");
  }
};
