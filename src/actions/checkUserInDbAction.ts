import { prisma } from "@/lib/prisma";
import { User as ClerkUserType } from "@clerk/nextjs/server";
import { User as PrismaUserType } from "@prisma/client";

export type CheckUserInDbActionType = {
  status: "success" | "error";
  user: PrismaUserType;
  message: string;
} | null;

export const checkUserInDbAction = async (
  clerkUser: ClerkUserType
): Promise<CheckUserInDbActionType | null> => {
  try {
    const existingUser: PrismaUserType | null = await prisma.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    });

    if (existingUser) {
      return {
        status: "success",
        user: existingUser,
        message: "Login successfull ...",
      };
    }

    const newUser: PrismaUserType = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: clerkUser.fullName,
        avatar: clerkUser.imageUrl,
      },
    });

    return {
      status: "success",
      user: newUser,
      message: "Sign-up successfull ...",
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
