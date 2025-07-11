"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const deleteReply = async (
  id: string
): Promise<{ status: "success" | "fail"; msg: string }> => {
  try {
    const user = await currentUser();
    if (!user) return { status: "fail", msg: "Fail" };

    const response = await prisma.replyComment.delete({ where: { id } });
    if (!response)
      return {
        status: "fail",
        msg: "Something went wrong while deleting the comment! Please try again..",
      };

    return { status: "success", msg: "Success" };
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      msg: "Unexpected error while deleting the comment! Please try again..",
    };
  }
};
