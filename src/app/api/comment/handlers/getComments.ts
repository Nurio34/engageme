import { currentUser } from "@clerk/nextjs/server";
import { PrismaPostCommentWithLikes } from "../../../../../prisma/types/post";

export const getComments = async (
  postId: string
): Promise<{
  status: "success" | "fail";
  comments: PrismaPostCommentWithLikes[];
}> => {
  try {
    const user = await currentUser();
    if (!user) return { status: "fail", comments: [] };

    const userId = user.id;

    const response = await fetch(
      `${process.env.SITE_URL}/api/comment?post=${postId}&user=${userId}`,
      {
        cache: "force-cache",
        next: { revalidate: 120, tags: ["postComments"] },
      }
    );

    if (!response.ok) return { status: "fail", comments: [] };

    const { status, comments } = await response.json();

    if (status === "fail") return { status: "fail", comments: [] };

    return { status: "success", comments };
  } catch (error) {
    console.log(error);
    return { status: "fail", comments: [] };
  }
};
