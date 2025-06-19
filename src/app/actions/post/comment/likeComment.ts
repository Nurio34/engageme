"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PostCommentLike } from "@prisma/client";

export const likeComment = async (
  commentId: string
): Promise<{
  status: "success" | "fail";
  message: string;
  postCommentLike?: PostCommentLike;
}> => {
  try {
    const user = await currentUser();
    if (!user)
      return {
        status: "fail",
        message: "You have to signin to like comments!",
      };

    const userId = user.id;

    const postCommentLike = await prisma.postCommentLike.create({
      data: {
        userId,
        commentId,
      },
    });

    if (!postCommentLike)
      return {
        status: "fail",
        message:
          "Something went wrong while liking the comment ! Please try again...",
      };

    return { status: "success", message: "Success", postCommentLike };
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      message:
        "Something went wrong while liking the comment ! Please try again...",
    };
  }
};
