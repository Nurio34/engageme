import PostsContainer from "./PostsContainer";
import Recomendations from "./Recomendations";
import PushNotification from "@/app/_globalComponents/PushNotification";

async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ variant: string }>;
}) {
  const { variant } = await searchParams;

  return (
    <div
      className=" md:grid lg:grid-cols-[630px,383px] lg:justify-center
        md:px-16 md:py-[22px]
      "
    >
      <PushNotification />
      <PostsContainer variant={variant} />
      <Recomendations />
    </div>
  );
}

export default HomePage;
