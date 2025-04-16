"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PostCommentLike, ReplyCommentLike } from "@prisma/client";

export const removeLikeFromReply = async (
  replyId: string
): Promise<{
  status: "success" | "fail";
  replyLike?: ReplyCommentLike;
}> => {
  try {
    const user = await currentUser();
    if (!user) return { status: "fail" };

    const userId = user.id;

    const replyLike = await prisma.replyCommentLike.delete({
      where: { userId_commentId: { userId, commentId: replyId } },
    });
    if (!replyLike) return { status: "fail" };

    return { status: "success", replyLike };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
