"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";

export const likeThePost = async (formData: FormData) => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) return;

  const postId = formData.get("postId") as string;

  try {
    const response = await prisma.postLike.create({ data: { userId, postId } });

    if (!response) return;

    revalidateTag(`likes-${postId}`);
  } catch (error) {
    console.log(error);
    return;
  }
};
