import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { PrismaPostType } from "../../../../prisma/types/post";

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log("getPosts()...");

  if (req.headers.get("request-secret") !== process.env.REQUEST_SECRET!) {
    return NextResponse.json({ status: "fail" }, { status: 401 });
  }

  // const variant = req.nextUrl.searchParams.get("variant"); //! "followings" || undefined

  try {
    const posts: PrismaPostType[] = await prisma.post.findMany({
      include: {
        user: true,
        medias: {
          include: {
            poster: true,
            transformation: true,
          },
        },
        location: true,
        settings: true,
        likes: true,
        comments: {
          include: {
            user: true,
            likes: true,
            replies: {
              include: {
                likes: true,
                user: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({ status: "success", posts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "fail" }, { status: 500 });
  }
}
