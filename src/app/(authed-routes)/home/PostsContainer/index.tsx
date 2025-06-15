import Link from "next/link";
import Header from "./Header";
import Posts from "./Posts";
import { getPosts } from "@/app/api/post/handler/getPosts";

async function PostsContainer({ variant }: { variant: string | undefined }) {
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
      <Header />
      <Posts posts={posts} variant={variant} />
    </main>
  );
}
export default PostsContainer;
