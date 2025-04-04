"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PostType } from "../DragAndDropArea/Gallery/Sharing";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export const savePost = async (
  post: PostType
): Promise<{ status: "success" | "fail" }> => {
  const user = await currentUser();
  if (!user) redirect("/home");

  const { medias, message, location, settings } = post;
  console.log(post);

  try {
    const response = await prisma.post.create({
      data: {
        userId: user.id, // Clerk user ID
        message: message,
        medias: medias && {
          create: medias.map((media) => ({
            publicId: media.publicId,
            url: media.url,
            type: media.type,
            width: media?.width,
            height: media?.height,
            altText: media?.altText,
            isAudioAllowed: media?.isAudioAllowed,
            poster: media.poster && {
              create: {
                publicId: media.poster?.publicId,
                url: media.poster?.url,
              },
            },
            transformation: media.transformation && {
              create: {
                crop: media.transformation.crop!,
                width: media.transformation.width!,
                height: media.transformation.height!,
                x: media.transformation.x!,
                y: media.transformation.y!,
              },
            },
          })),
        },
        location: location && {
          create: {
            locationId: location.id,
            name: location.name,
          },
        },
        settings: settings && {
          create: {
            isCommentingAllowed: settings.isCommentingAllowed,
            isCountsVisible: settings.isCountsVisible,
          },
        },
      },
    });

    if (!response) {
      return { status: "fail" };
    }

    revalidateTag("posts");
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
