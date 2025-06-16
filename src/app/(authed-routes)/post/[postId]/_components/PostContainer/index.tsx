import { PrismaPostType } from "../../../../../../../prisma/types/post";
import OtherPostsOfUser from "./OtherPostsOfUser";
import Post from "./Post";

function PostContainer({ post }: { post: PrismaPostType }) {
  return (
    <main>
      <Post post={post} />
      <OtherPostsOfUser />
    </main>
  );
}
export default PostContainer;
