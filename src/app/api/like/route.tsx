import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  if (req.headers.get("request-secret") !== process.env.REQUEST_SECRET!) {
    return NextResponse.json({ status: "fail" }, { status: 401 });
  }

  const postId = req.nextUrl.searchParams.get("postId");
  const userId = req.nextUrl.searchParams.get("userId");

  if (postId && userId) {
    console.log("getLikesOfThePost()");

    try {
      const postLikesResponse = prisma.postLike.findMany({ where: { postId } });
      const isPostLikedResponse = prisma.postLike.findUnique({
        where: { userId_postId: { userId, postId } },
      });

      const [postLikes, isPostLiked] = await prisma.$transaction([
        postLikesResponse,
        isPostLikedResponse,
      ]);

      return NextResponse.json(
        { status: "success", postLikes, isPostLiked: !!isPostLiked },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { status: "fail", postLikes: [], isPostLiked: false },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ status: "fail", postLikes: [] }, { status: 400 });
};
