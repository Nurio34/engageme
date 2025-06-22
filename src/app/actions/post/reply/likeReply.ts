"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { ReplyCommentLike } from "@prisma/client";

export const likeReply = async (
  replyId: string
): Promise<{
  status: "success" | "fail";
  message: string;
  replyLike?: ReplyCommentLike;
}> => {
  try {
    const user = await currentUser();
    if (!user)
      return {
        status: "fail",
        message: "You have to sign in to like replies!",
      };

    const userId = user.id;

    const replyLike = await prisma.replyCommentLike.create({
      data: { commentId: replyId, userId },
    });

    if (!replyLike)
      return {
        status: "fail",
        message:
          "Something went wrong while liking the reply ! Please try again...",
      };

    return { status: "success", message: "Success", replyLike };
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      message:
        "Something went wrong while liking the reply ! Please try again...",
    };
  }
};
