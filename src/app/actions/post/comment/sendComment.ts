"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaPostCommentType } from "../../../../../prisma/types/post";

export const sendComment = async (
  prevState: { status: string; postComment?: PrismaPostCommentType },
  formData: FormData
): Promise<{
  status: "success" | "fail";
  postComment?: PrismaPostCommentType;
}> => {
  try {
    const user = await currentUser();
    if (!user)
      return { status: "fail", postComment: {} as PrismaPostCommentType };

    const userId = user.id;
    const postId = formData.get("postId") as string;
    const comment = formData.get("comment") as string;

    const postComment = await prisma.postComment.create({
      data: {
        userId,
        postId,
        comment,
      },
      include: {
        user: true,
        likes: true,
      },
    });

    if (!postComment)
      return { status: "fail", postComment: {} as PrismaPostCommentType };

    return {
      status: "success",
      postComment,
    };
  } catch (error) {
    console.log(error);
    return { status: "fail", postComment: {} as PrismaPostCommentType };
  }
};
