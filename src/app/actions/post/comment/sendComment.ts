"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import {
  PrismaPostCommentType,
  PrismaReplyCommentType,
} from "../../../../../prisma/types/post";

export const sendComment = async (
  prevState: {
    status: string;
    postComment?: PrismaPostCommentType;
    replyComment?: PrismaReplyCommentType;
    isReply: boolean;
  },
  formData: FormData
): Promise<{
  status: "success" | "fail";
  postComment?: PrismaPostCommentType;
  replyComment?: PrismaReplyCommentType;
  isReply: boolean;
}> => {
  try {
    const user = await currentUser();
    if (!user)
      return {
        status: "fail",
        postComment: {} as PrismaPostCommentType,
        isReply: false,
      };

    const userId = user.id;
    const postId = formData.get("postId") as string;
    const comment = formData.get("comment") as string;
    const isReply = formData.get("isReply") as string;
    const isReplyState = isReply === "1";
    const replyToId = formData.get("replyToId") as string;
    const isReplyToReply = formData.get("isReplyToReply") as string;
    const isReplyToReplyState = isReplyToReply === "1";
    const replyToName = formData.get("replyToName") as string;

    console.log({
      userId,
      postId,
      comment,
      isReplyState,
      replyToId,
      isReplyToReplyState,
    });

    if (!isReplyState) {
      const postComment = await prisma.postComment.create({
        data: {
          userId,
          postId,
          comment,
        },
        include: {
          user: true,
          likes: true,
          replies: {
            include: {
              user: true,
              likes: true,
            },
          },
        },
      });

      if (!postComment)
        return {
          status: "fail",
          postComment: {} as PrismaPostCommentType,
          isReply: isReplyState,
        };

      return {
        status: "success",
        postComment,
        isReply: isReplyState,
      };
    } else {
      if (!isReplyToReplyState) {
        const replyComment = await prisma.replyComment.create({
          data: {
            commentId: replyToId,
            userId,
            comment,
          },
          include: {
            user: true,
            likes: true,
          },
        });

        if (!replyComment)
          return {
            status: "fail",
            replyComment: {} as PrismaReplyCommentType,
            isReply: isReplyState,
          };

        return {
          status: "success",
          replyComment,
          isReply: isReplyState,
        };
      } else {
        const replyComment = await prisma.replyComment.create({
          data: {
            commentId: replyToId,
            userId,
            comment,
            replyToName,
          },
          include: {
            user: true,
            likes: true,
          },
        });

        if (!replyComment)
          return {
            status: "fail",
            replyComment: {} as PrismaReplyCommentType,
            isReply: isReplyState,
          };

        return {
          status: "success",
          replyComment,
          isReply: isReplyState,
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      postComment: {} as PrismaPostCommentType,
      replyComment: {} as PrismaReplyCommentType,
      isReply: false,
    };
  }
};
