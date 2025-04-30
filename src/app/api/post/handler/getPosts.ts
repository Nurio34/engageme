import { currentUser } from "@clerk/nextjs/server";
import { PrismaPostType } from "../../../../../prisma/types/post";

export const getPosts = async (
  variant?: string
): Promise<{ status: "success" | "fail"; posts: PrismaPostType[] }> => {
  try {
    const user = await currentUser();

    if (!user) return { status: "fail", posts: [] };

    const response = await fetch(
      `${process.env.SITE_URL}/api/post?variant=${variant}`,
      {
        headers: {
          "request-secret": process.env.REQUEST_SECRET!,
        },
        cache: "no-store",
        next: { tags: ["posts"] },
      }
    );

    if (!response.ok) return { status: "fail", posts: [] };

    const data = await response.json();

    const { status, posts } = data;

    if (status === "fail") return { status: "fail", posts: [] };

    return { status: "success", posts };
  } catch (error) {
    console.log(error);

    return { status: "fail", posts: [] };
  }
};
