import Link from "next/link";
import Header from "./Header";
import Posts from "./Posts";
import { getPosts } from "@/app/api/post/posts/handler/getPosts";
import { getRecommendations } from "@/app/api/recomendation/handler/getRecomendations";
import { PrismaPostType } from "../../../../../prisma/types/post";
import { getFollowingsPosts } from "@/app/api/post/followingsPosts/handler";
import { getFavoritesPosts } from "@/app/api/post/favoritesPosts/handler";

async function PostsContainer({
  variant,
}: {
  variant: string | undefined; //! undefined | "home" | "followings" | "favorites"
}) {
  let postsState: PrismaPostType[] = [];
  let statusState: "success" | "fail" = "fail";

  if (!variant || variant === "home") {
    const { status, posts } = await getPosts(0);
    statusState = status;
    postsState = posts;
  }
  if (variant === "followings") {
    const { status, posts } = await getFollowingsPosts(0);
    statusState = status;
    postsState = posts;
  }
  if (variant === "favorites") {
    const { status, posts } = await getFavoritesPosts(0);
    statusState = status;
    postsState = posts;
  }
  const { status: recomendationsStatus, recomendations } =
    await getRecommendations();

  if (
    statusState === "fail" ||
    recomendationsStatus === "fail" ||
    !recomendations
  )
    return (
      <div>
        <p>There is an error</p>
        <Link href={"/home"} className="btn btn-primary">
          Refresh
        </Link>
      </div>
    );

  return (
    <main className="flex flex-col items-center">
      <Header recomendations={recomendations} variant={variant} />
      <Posts
        posts={postsState}
        variant={variant}
        recomendations={recomendations}
      />
    </main>
  );
}
export default PostsContainer;
