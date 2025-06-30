import { currentUser } from "@clerk/nextjs/server";

export type PrismaRecomendationType = {
  userId: string;
  name: string;
  avatar: string;
  fullname: string;
};

export const getRecommendations = async (): Promise<{
  status: "success" | "fail";
  recomendations?: PrismaRecomendationType[];
}> => {
  console.log("getRecomendations()...");

  try {
    const user = await currentUser();

    const response = await fetch(`${process.env.SITE_URL}/api/recomendation`, {
      method: "GET",
      headers: {
        "request-secret": process.env.REQUEST_SECRET!,
        "user-id": user?.id || "",
      },
      cache: "force-cache",
      next: { tags: ["recomendations"], revalidate: 60 * 60 },
    });

    const { status: statusCode, ok } = response;

    if (!ok || statusCode >= 300) return { status: "fail" };

    const { status, recomendations } = await response.json();

    return { status, recomendations };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
