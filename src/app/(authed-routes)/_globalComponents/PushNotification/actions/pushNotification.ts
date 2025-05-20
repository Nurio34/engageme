"use server";

import { prisma } from "@/lib/prisma";
import webPush from "web-push";

webPush.setVapidDetails(
  `mailto:${process.env.EMAIL_USER}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export const pushNotification = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) return { status: "fail" };

    const { authToken, pushToken, endpoint } = user;

    if (!authToken || !pushToken || !endpoint) return { status: "fail" };

    const subscription = {
      endpoint: endpoint,
      keys: {
        p256dh: pushToken,
        auth: authToken,
      },
    };

    await webPush.sendNotification(
      subscription,
      JSON.stringify({ title: "Title", message: "Message" })
    );
  } catch (error) {
    console.error(error);
  }
};
