"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";

export const deletePost = async (
  userId: string,
  postId: string
): Promise<{ status: "success" | "fail"; msg: string }> => {
  const requestSecret = process.env.REQUEST_SECRET;
  if (!requestSecret) return { status: "fail", msg: "Step off hacker !" };

  try {
    const user = await currentUser();
    if (!user)
      return { status: "fail", msg: "You have to sign in to delete the post!" };
    if (user.id !== userId)
      return {
        status: "fail",
        msg: "You're only allowed to delete your own post!",
      };

    const deletedPost = await prisma.post.delete({
      where: { userId, id: postId },
    });
    if (!deletedPost)
      return {
        status: "fail",
        msg: "Something went wrong while deleting the post! Please try again..",
      };

    return { status: "success", msg: "Success" };
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      msg: "Unexpected error while deleting the post! Please try again..",
    };
  } finally {
    revalidateTag("posts");
    //! *** forecast ***
    revalidateTag("profile");
    //! ***
  }
};
