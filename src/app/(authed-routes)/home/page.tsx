import { getRecommendations } from "@/app/api/recomendation/handler/getRecomendations";
import PostsContainer from "./PostsContainer";
import Recomendations from "./Recomendations";

async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const variant = (await searchParams).variant;

  const { status, recomendations } = await getRecommendations();

  if (status === "fail" || !recomendations) return <div>Error</div>;

  return (
    <div
      className=" md:grid xl:grid-cols-[630px,minmax(0px,383px)] xl:justify-center
        md:px-16 md:py-[22px]
      "
    >
      <PostsContainer variant={variant} recomendations={recomendations} />
      <Recomendations recomendations={recomendations} />
    </div>
  );
}

export default HomePage;
