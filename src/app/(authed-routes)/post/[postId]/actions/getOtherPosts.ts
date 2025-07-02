"use server";

import { prisma } from "@/lib/prisma";
import { PostPreviewType } from "../../../../../../prisma/types/postPreview";

export const getOtherPosts = async (
  userId: string,
  postId: string,
  path: "post" | "profile"
): Promise<{ status: "success" | "fail"; posts: PostPreviewType[] }> => {
  if (path === "post") {
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
        orderBy: {
          createdAt: "desc",
        },
      });
      return { status: "success", posts };
    } catch (error) {
      console.log(error);
      return { status: "fail", posts: [] };
    }
  } else {
    try {
      const posts = await prisma.post.findMany({
        where: {
          userId,
        },
        include: {
          medias: {
            take: 1,
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
        orderBy: {
          createdAt: "desc",
        },
      });
      return { status: "success", posts };
    } catch (error) {
      console.log(error);
      return { status: "fail", posts: [] };
    }
  }
};
