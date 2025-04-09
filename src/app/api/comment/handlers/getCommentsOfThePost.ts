import { currentUser } from "@clerk/nextjs/server";
import { PrismaPostCommentWithLikes } from "../../../../../prisma/types/post";

export const getCommentsOfThePost = async (
  postId: string
): Promise<{
  status: "success" | "fail";
  postComments: PrismaPostCommentWithLikes[];
}> => {
  try {
    const user = await currentUser();
    if (!user) return { status: "fail", postComments: [] };

    const userId = user.id;

    const response = await fetch(
      `${process.env.SITE_URL}/api/comment?post=${postId}&user=${userId}`,
      {
        headers: {
          "request-secret": process.env.REQUEST_SECRET!,
        },
        next: { revalidate: 3600, tags: ["postComments"] },
      }
    );

    if (!response.ok) return { status: "fail", postComments: [] };

    const { status, postComments } = await response.json();

    if (status === "fail") return { status: "fail", postComments: [] };

    return { status: "success", postComments };
  } catch (error) {
    console.log(error);
    return { status: "fail", postComments: [] };
  }
};
