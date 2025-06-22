"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";

export const dontSuggest = async (
  userId: string
): Promise<{ status: "success" | "fail"; msg: string }> => {
  try {
    const user = await currentUser();
    if (!user)
      return {
        status: "fail",
        msg: "You have to sign in to do this action...",
      };

    const response = await prisma.dontSuggest.create({
      data: { userId: user.id, dontSuggestUserId: userId },
    });

    if (!response)
      return {
        status: "fail",
        msg: "Something went wrong! Please try again...",
      };

    return { status: "success", msg: "You won't see this person again." };
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      msg: "Unexpected server error! Please try again...",
    };
  } finally {
    revalidateTag("recomendations");
  }
};
