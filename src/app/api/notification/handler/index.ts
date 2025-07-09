import { currentUser } from "@clerk/nextjs/server";
import { AllNotificationsType } from "../../../../../prisma/types/notification";

export const getNotifications = async (): Promise<{
  status: "success" | "fail";
  allNotifications?: AllNotificationsType;
}> => {
  try {
    const user = await currentUser();

    const response = await fetch(`${process.env.SITE_URL}/api/notification`, {
      method: "GET",
      headers: {
        "request-secret": process.env.REQUEST_SECRET!,
        "user-id": user?.id || "null",
      },
      cache: "force-cache",
      next: {
        tags: ["notifications"],
        revalidate: 60 * 15,
      },
    });

    const { status: statusCode, ok } = response;

    if (!ok || statusCode >= 300) return { status: "fail" };

    const { status, allNotifications } = await response.json();

    return { status, allNotifications };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
