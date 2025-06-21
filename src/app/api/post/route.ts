import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { PrismaPostType } from "../../../../prisma/types/post";

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log("getPosts()...");

  if (req.headers.get("request-secret") !== process.env.REQUEST_SECRET!) {
    return NextResponse.json({ status: "fail" }, { status: 401 });
  }

  const skip = parseInt(req.nextUrl.searchParams.get("skip")!);
  const variant = req.nextUrl.searchParams.get("variant"); //! "undefined" || "home" || "followings" || "favorites"

  let posts: PrismaPostType[] = [];

  try {
    if (variant === "undefined" || variant === "home") {
      posts = await prisma.post.findMany({
        include: {
          user: {
            include: {
              _count: {
                select: {
                  posts: true,
                },
              },
            },
          },
          medias: {
            include: {
              poster: true,
              transformation: true,
            },
          },
          location: true,
          settings: true,
          likes: {
            include: {
              user: true,
            },
          },
          comments: {
            include: {
              user: true,
              likes: {
                include: {
                  user: true,
                },
              },
              replies: {
                include: {
                  likes: {
                    include: {
                      user: true,
                    },
                  },
                  user: true,
                },
                orderBy: {
                  createdAt: "asc",
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        skip: skip * 5,
        take: 5,
      });
    }

    return NextResponse.json({ status: "success", posts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "fail" }, { status: 500 });
  }
}
