import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const postId = req.nextUrl.searchParams.get("post");
  const userId = req.nextUrl.searchParams.get("user");

  if (postId && userId) {
    try {
      const comments = await prisma.postComment.findMany({
        where: { postId },
        orderBy: { createdAt: "asc" },
        include: { likes: true },
      });

      const sortedComments = [
        ...comments.filter((c) => c.userId === userId),
        ...comments.filter((c) => c.userId !== userId),
      ];

      return NextResponse.json(
        { status: "success", comments: sortedComments },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { status: "fail", comments: [] },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ status: "fail", comments: [] }, { status: 400 });
};
