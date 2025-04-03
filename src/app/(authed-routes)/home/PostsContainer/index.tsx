import { getPosts } from "@/app/actions/post/getPosts";
import Header from "./Header";
import Posts from "./Posts";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function PostsContainer({ variant }: { variant: string | undefined }) {
  const user = await currentUser();

  if (!user) redirect("/");

  const { id } = user;

  const posts = await fetch(`${process.env.SITE_URL}/api/post`, {
    headers: {
      "request-secret": process.env.REQUEST_SECRET!,
    },
    next: { tags: ["posts"] },
  });

  return (
    <main>
      <Header />
      <Posts />
    </main>
  );
}
export default PostsContainer;
