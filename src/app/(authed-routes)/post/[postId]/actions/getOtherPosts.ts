"use server";

import { prisma } from "@/lib/prisma";
import { PostPreviewType } from "../../../../../../prisma/types/postPreview";

export const getOtherPosts = async (
  userId: string,
  postId: string
): Promise<{ status: "success" | "fail"; posts: PostPreviewType[] }> => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId,
        NOT: {
          id: postId,
        },
      },
      include: {
        medias: {
          take: 1, // First media
          select: {
            altText: true,
            width: true,
            height: true,
            poster: true,
            type: true,
            url: true,
            transformation: true,
          },
        },
        _count: {
          select: {
            medias: true,
            comments: true,
            likes: true,
          },
        },
      },
    });
    return { status: "success", posts };
  } catch (error) {
    console.log(error);
    return { status: "fail", posts: [] };
  }
};
