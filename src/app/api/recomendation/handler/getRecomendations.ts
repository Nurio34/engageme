import { currentUser } from "@clerk/nextjs/server";
import { PrismaRecomendationType } from "../../../../../prisma/types/recomendation";

export const getRecommendations = async (): Promise<{
  status: "success" | "fail";
  recomendations?: PrismaRecomendationType[];
}> => {
  try {
    const user = await currentUser();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/recomendation`,
      {
        method: "GET",
        headers: {
          "request-secret": process.env.REQUEST_SECRET!,
          "user-id": user?.id || "",
        },
        // cache: "force-cache",
        next: {
          tags: ["recomendations"],
          // revalidate: 60 * 15,
        },
      }
    );

    const { status: statusCode, ok } = response;

    if (!ok || statusCode >= 300) return { status: "fail" };

    const { status, recomendations } = await response.json();

    return { status, recomendations };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};
