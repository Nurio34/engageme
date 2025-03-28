"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const handleUser = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) return redirect("/login"); // Handle missing authentication properly

  const { id: userId, fullName, imageUrl: avatar, emailAddresses } = clerkUser;

  let user;

  try {
    user = await prisma.user.findUnique({
      where: { userId },
      include: {
        posts: true,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          userId,
          name: fullName!,
          avatar,
          email: emailAddresses[0].emailAddress,
        },
      });
    }
    console.log("handleUser() success");

    return user;
  } catch (error) {
    console.error("Database Error:", error);
    return redirect("/error"); // Redirect to an error page instead of using inside catch
  }
};
