import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  console.log("api call...");

  const requestSecret = req.headers.get("request-secret");
  const userId = req.headers.get("user-id");

  if (!requestSecret)
    return NextResponse.json(
      { status: "fail", msg: "Unauthenticated !" },
      { status: 401 }
    );

  if (requestSecret !== process.env.REQUEST_SECRET)
    return NextResponse.json(
      { status: "fail", msg: "Unauthenticated !" },
      { status: 401 }
    );
  console.log({ userId });

  //! if client authenticated, find the client's DontSuggest array and filter recomendations according to this
  if (userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { userId },
        select: {
          userId: true,
          dontSuggestsMade: {
            select: {
              dontSuggestUserId: true,
            },
          },
        },
      });

      if (!user)
        return NextResponse.json(
          { status: "fail", msg: "Not found !" },
          { status: 404 }
        );

      // Extract blocked userIds
      const blockedIds = user.dontSuggestsMade.map((d) => d.dontSuggestUserId);

      // Include all users except blocked and current user
      const recomendations = await prisma.user.findMany({
        where: {
          userId: {
            notIn: [...blockedIds, userId],
          },
        },
        select: {
          userId: true,
          name: true,
          avatar: true,
        },
      });

      return NextResponse.json(
        { status: "success", msg: "Success !", recomendations },
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

  //! else recoment ever user in app
  else {
    try {
      const recomendations = await prisma.user.findMany({
        select: {
          userId: true,
          name: true,
          avatar: true,
        },
      });
      return NextResponse.json(
        { status: "success", msg: "Success !", recomendations },
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
}
