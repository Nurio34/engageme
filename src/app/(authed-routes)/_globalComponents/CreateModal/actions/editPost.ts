"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PostType } from "../DragAndDropArea/Gallery/Sharing";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export const editPost = async (
  postId: string,
  editedPost: PostType
): Promise<{ status: "success" | "fail"; message: string }> => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: "fail", message: "You have to sign in to create post!" };
    }

    const response = await prisma.post.update({
      where: { id: postId },
      data: {
        message: editedPost.message,
        settings: {
          update: {
            isCountsVisible: editedPost.settings.isCountsVisible,
            isCommentingAllowed: editedPost.settings.isCommentingAllowed,
          },
        },
        location: {
          update: {
            locationId: editedPost.location.id,
            name: editedPost.location.name,
          },
        },
      },
    });

    await Promise.all(
      editedPost.medias.map((media) =>
        prisma.media.update({
          where: { publicId: media.publicId },
          data: {
            altText: media.altText,
          },
        })
      )
    );

    if (!response)
      return {
        status: "fail",
        message: "Something happened while editing post! Please try again..",
      };

    return { status: "success", message: "Success" };
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      message: "Unexpected error while editing post! Please try again..",
    };
  } finally {
    revalidateTag("posts");
  }
};
