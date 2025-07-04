import Link from "next/link";
import Header from "./Header";
import Posts from "./Posts";
import { getPosts } from "@/app/api/post/handler/getPosts";
import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";

async function PostsContainer({
  variant,
  recomendations,
}: {
  variant: string | undefined;
  recomendations: PrismaRecomendationType[];
}) {
  const { status, posts } = await getPosts(0, variant);

  if (status === "fail")
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
      <Header recomendations={recomendations} />
      <Posts posts={posts} variant={variant} recomendations={recomendations} />
    </main>
  );
}
export default PostsContainer;
