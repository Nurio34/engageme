"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import webpush from "web-push";

export const pushSubscribe = async (
  userId: string,
  subscription: string
): Promise<{ status: "success" | "fail" | "error" }> => {
  if (!userId || !subscription) return { status: "fail" };

  const parsedSubscription = JSON.parse(
    subscription
  ) as webpush.PushSubscription;

  const { endpoint, keys } = parsedSubscription;
  const { auth, p256dh } = keys;

  if (!endpoint || !auth || !p256dh) return { status: "fail" };

  try {
    const user = await currentUser();

    if (!user) return { status: "fail" };

    const { id } = user;

    if (id !== userId) return { status: "fail" };

    const updatedUser = await prisma.user.update({
      where: { userId },
      data: { authToken: auth, pushToken: p256dh, endpoint },
    });

    if (!updatedUser) return { status: "fail" };

    return { status: "success" };
  } catch (error) {
    console.error(error);
    return { status: "error" };
  }
};
