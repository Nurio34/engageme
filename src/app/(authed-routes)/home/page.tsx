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
      className="grow md:grid md:grid-cols-[1fr,319px] gap-x-16
        px-16 py-6
      "
    >
      <PostsContainer variant={variant} />
      <Recomendations />
    </div>
  );
}

export default HomePage;
