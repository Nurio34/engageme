import { PostLike } from "@prisma/client";

export const getLikesOfThePost = async (
  postId: string,
  userId: string
): Promise<{
  status: "success" | "fail";
  postLikes: PostLike[];
  isPostLiked: boolean;
}> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/like?postId=${postId}&userId=${userId}`,

      {
        headers: {
          "request-secret": process.env.REQUEST_SECRET!,
        },
        next: { tags: [`likes-${postId}`], revalidate: 3600 },
      }
    );
    const data = await response.json();

    if (!response.ok)
      return { status: "fail", postLikes: [], isPostLiked: false };

    const { status, postLikes, isPostLiked } = data;

    if (status === "fail")
      return { status: "fail", postLikes: [], isPostLiked: false };

    return { status: "success", postLikes, isPostLiked };
  } catch (error) {
    console.log(error);
    return { status: "fail", postLikes: [], isPostLiked: false };
  }
};
