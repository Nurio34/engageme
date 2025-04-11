import { PostCommentLike, PostLike } from "@prisma/client";

export const getLikesOfTheComment = async (
  commentId: string,
  userId: string
): Promise<{
  status: "success" | "fail";
  commentLikes: PostCommentLike[];
  isCommentLiked: boolean;
}> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/like?commentId=${commentId}&userId=${userId}`,

      {
        headers: {
          "request-secret": process.env.NEXT_PUBLIC_REQUEST_SECRET!,
        },
        next: { tags: [`commentLikes-${commentId}`], revalidate: 3600 },
      }
    );
    const data = await response.json();

    if (!response.ok)
      return { status: "fail", commentLikes: [], isCommentLiked: false };

    const { status, commentLikes, isCommentLiked } = data;

    if (status === "fail")
      return { status: "fail", commentLikes: [], isCommentLiked: false };

    return { status: "success", commentLikes, isCommentLiked };
  } catch (error) {
    console.log(error);
    return { status: "fail", commentLikes: [], isCommentLiked: false };
  }
};
