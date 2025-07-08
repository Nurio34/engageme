import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  console.log("getRecomendations()...");

  const requestSecret = req.headers.get("request-secret");
  const userId = req.headers.get("user-id");

  if (!requestSecret || requestSecret !== process.env.REQUEST_SECRET) {
    return NextResponse.json(
      { status: "fail", msg: "Unauthenticated !" },
      { status: 401 }
    );
  }

  try {
    let excludeIds: string[] = [];

    if (userId) {
      const [user, followings] = await Promise.all([
        prisma.user.findUnique({
          where: { userId },
          select: {
            dontSuggestsMade: {
              select: { dontSuggestUserId: true },
            },
          },
        }),
        prisma.follow.findMany({
          where: { followerId: userId },
          select: { followingId: true },
        }),
      ]);

      const blockedIds =
        user?.dontSuggestsMade.map((d) => d.dontSuggestUserId) ?? [];
      const followingIds = followings.map((f) => f.followingId);

      excludeIds = [...blockedIds, ...followingIds, userId];
    }

    const recomendations = await prisma.user.findMany({
      where: {
        userId: { notIn: excludeIds },
      },
      select: {
        userId: true,
        name: true,
        avatar: true,
        fullname: true,
        _count: {
          select: {
            posts: true,
            following: true,
            followers: true,
          },
        },
        posts: {
          include: {
            medias: {
              take: 1,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 3,
        },
        followers: {
          select: {
            followerId: true,
          },
        },
      },
    });

    return NextResponse.json(
      { status: "success", msg: "Success!", recomendations },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "fail", msg: "Server error occurred", recomendations: [] },
      { status: 500 }
    );
  }
}
