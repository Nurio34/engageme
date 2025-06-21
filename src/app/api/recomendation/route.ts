import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  console.log("api call...");

  const requestSecret = req.headers.get("request-secret");
  const userId = req.headers.get("user-id");

  if (!requestSecret || !userId)
    return NextResponse.json(
      { status: "fail", msg: "Unauthenticated !" },
      { status: 401 }
    );

  if (requestSecret !== process.env.REQUEST_SECRET)
    return NextResponse.json(
      { status: "fail", msg: "Unauthenticated !" },
      { status: 401 }
    );

  try {
    const user = await prisma.user.findUnique({
      where: { userId: userId },
      select: { userId: true },
    });

    if (!user)
      return NextResponse.json(
        { status: "fail", msg: "Not found !" },
        { status: 404 }
      );

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
