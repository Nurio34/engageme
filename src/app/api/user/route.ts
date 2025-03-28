import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("api call...");

  const clerkUser = await req.json();
  if (!clerkUser) return NextResponse.json({ status: "fail" }, { status: 401 });

  const { id: userId, username, imageUrl: avatar, emailAddresses } = clerkUser;

  let user;
  try {
    user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      await prisma.user.create({
        data: {
          userId,
          name: username,
          avatar,
          email: emailAddresses[0].emailAddress,
        },
      });
    }

    return NextResponse.json({ status: "success", user }, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "fail" }, { status: 500 });
  }
}
