import { prisma } from "@/lib/prisma";
import { User } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("handleUser()...");

  const clerkUser: User | null = await req.json();
  if (!clerkUser) return NextResponse.json({ status: "fail" }, { status: 401 });

  if (req.headers.get("request-secret") !== process.env.REQUEST_SECRET!) {
    return NextResponse.json({ status: "fail" }, { status: 401 });
  }

  const {
    id: userId,
    username,
    imageUrl: avatar,
    emailAddresses,
    firstName,
    lastName,
  } = clerkUser;
  console.log(clerkUser);

  let user;
  try {
    user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          userId,
          name: username!,
          fullname: firstName + " " + lastName,
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
