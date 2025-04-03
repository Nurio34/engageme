"use server";

import { prisma } from "@/lib/prisma";
import { PrismaPostType } from "../../../../prisma/types/post";
import { unstable_cache } from "next/cache";

// ✅ Correct Return Type
type ReturnType = {
  status: "success" | "fail";
  posts?: PrismaPostType[];
};

export const getPosts = unstable_cache(
  async (variant?: string | undefined): Promise<ReturnType> => {
    console.log("getPosts() ...");

    try {
      const posts = await prisma.post.findMany({
        include: {
          user: true,
          medias: true,
          location: true,
          settings: true,
        },
      });

      if (!posts) {
        return { status: "fail" };
      }

      return { status: "success", posts };
    } catch (error) {
      console.error("Error fetching posts:", error);
      return { status: "fail" };
    }
  }
);
