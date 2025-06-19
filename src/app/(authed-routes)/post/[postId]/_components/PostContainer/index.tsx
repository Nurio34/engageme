import { PrismaPostType } from "../../../../../../../prisma/types/post";
import OtherPostsOfUser from "./OtherPostsOfUser";
import Post from "./Post";

function PostContainer({ post }: { post: PrismaPostType }) {
  const { id: postId, user } = post;
  const { userId, name: username } = user;

  return (
    <main>
      <Post post={post} />
      <OtherPostsOfUser userId={userId} username={username} postId={postId} />
    </main>
  );
}
export default PostContainer;
