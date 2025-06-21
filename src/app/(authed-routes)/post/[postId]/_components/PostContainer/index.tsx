import { PrismaPostType } from "../../../../../../../prisma/types/post";
import NoOtherPosts from "./NoOtherPosts";
import OtherPostsOfUser from "./OtherPostsOfUser";
import Post from "./Post";

function PostContainer({ post }: { post: PrismaPostType }) {
  const { id: postId, user } = post;
  const { userId, name: username, _count } = user;
  const { posts: postsCount } = _count;

  return (
    <main>
      <Post post={post} />
      {postsCount > 1 ? (
        <OtherPostsOfUser userId={userId} username={username} postId={postId} />
      ) : (
        <NoOtherPosts />
      )}
    </main>
  );
}
export default PostContainer;
