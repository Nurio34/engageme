import { PrismaPostType } from "../../../../../../../prisma/types/post";
import OtherPostsOfUser from "./OtherPostsOfUser";
import Post from "./Post";

function Client({ post }: { post: PrismaPostType }) {
  const { id: postId, user } = post;
  const { userId, name: username, _count } = user;
  const { posts: postsCount } = _count;

  return (
    <>
      <Post post={post} />
      {postsCount > 1 && (
        <OtherPostsOfUser userId={userId} username={username} postId={postId} />
      )}
    </>
  );
}
export default Client;
