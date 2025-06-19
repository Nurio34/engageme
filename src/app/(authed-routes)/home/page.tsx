import PostsContainer from "./PostsContainer";
import Recomendations from "./Recomendations";

async function HomePage() {
  // const { variant } = await searchParams;

  return (
    <div
      className=" md:grid lg:grid-cols-[630px,383px] lg:justify-center
        md:px-16 md:py-[22px]
      "
    >
      <PostsContainer variant={undefined} />
      <Recomendations />
    </div>
  );
}

export default HomePage;
