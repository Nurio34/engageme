import { PushNotificationManager } from "@/app/_globalComponents/PushNotificationManager";
import Header from "./Header";
import Posts from "./Posts";
import { getPosts } from "@/app/api/post/handler/getPosts";

async function PostsContainer({ variant }: { variant: string | undefined }) {
  const { status, posts } = await getPosts(variant);

  if (status === "fail")
    return (
      <div>
        <p>There is an error</p>
        <button type="button"></button>
      </div>
    );

  return (
    <main className="flex flex-col items-center">
      <Header />
      <PushNotificationManager />
      <Posts posts={posts} />
    </main>
  );
}
export default PostsContainer;
