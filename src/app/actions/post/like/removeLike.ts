"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";

export const removeLike = async (formData: FormData) => {
  const user = await currentUser();
  if (!user) return;

  const userId = user.id;

  const postId = formData.get("postId") as string;

  try {
    const response = await prisma.postLike.delete({
      where: { userId_postId: { userId, postId } },
    });
    if (!response) return;

    revalidateTag(`likes-${postId}`);
  } catch (error) {
    console.log(error);
  }
};
