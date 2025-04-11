import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  if (req.headers.get("request-secret") !== process.env.REQUEST_SECRET!) {
    return NextResponse.json({ status: "fail" }, { status: 401 });
  }

  const postId = req.nextUrl.searchParams.get("post");
  const userId = req.nextUrl.searchParams.get("user");

  if (postId && userId) {
    console.log("getPostComments()...");

    try {
      const postComments = await prisma.postComment.findMany({
        where: { postId },
        orderBy: { createdAt: "asc" },
        include: { likes: true, user: true },
      });

      const sortedPostComments = [
        ...postComments.filter((c) => c.userId === userId),
        ...postComments.filter((c) => c.userId !== userId),
      ];

      return NextResponse.json(
        { status: "success", postComments: sortedPostComments },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { status: "fail", postComments: [] },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { status: "fail", postComments: [] },
    { status: 400 }
  );
};
