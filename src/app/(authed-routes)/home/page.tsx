import PostsContainer from "./PostsContainer";
import Recomendations from "./Recomendations";

async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const variant = (await searchParams).variant;

  return (
    <div
      className=" md:grid xl:grid-cols-[630px,minmax(0px,383px)] xl:justify-center
        md:px-16 md:py-[22px]
      "
    >
      <PostsContainer variant={variant} />
      <Recomendations />
    </div>
  );
}

export default HomePage;
