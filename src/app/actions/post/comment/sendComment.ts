"use server";

import { SentCommentType } from "@/app/(authed-routes)/home/PostsContainer/Posts/Post/AddComment/client";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const sendComment = async (
  prevState: { status: string; comment: SentCommentType },
  formData: FormData
): Promise<{ status: "success" | "fail"; comment: SentCommentType }> => {
  try {
    const user = await currentUser();
    if (!user) return { status: "fail", comment: { id: "", comment: "" } };

    const userId = user.id;
    const postId = formData.get("postId") as string;
    const comment = formData.get("comment") as string;

    const response = await prisma.postComment.create({
      data: {
        userId,
        postId,
        comment,
      },
    });

    if (!response) return { status: "fail", comment: { id: "", comment: "" } };
    return {
      status: "success",
      comment: { id: response.id, comment: response.comment },
    };
  } catch (error) {
    console.log(error);
    return { status: "fail", comment: { id: "", comment: "" } };
  }
};
