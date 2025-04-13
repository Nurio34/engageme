import PostsContainer from "./PostsContainer";
import Recomendations from "./Recomendations";

async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ variant: string }>;
}) {
  const { variant } = await searchParams;

  return (
    <div
      className="col-start-2 col-end-3 md:grid lg:grid-cols-[1fr,319px] gap-x-16
        md:px-16 md:py-6
      "
    >
      <PostsContainer variant={variant} />
      <Recomendations />
    </div>
  );
}

export default HomePage;
