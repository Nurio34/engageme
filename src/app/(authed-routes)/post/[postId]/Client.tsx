import { PrismaPostType } from "../../../../../prisma/types/post";
import PostContainer from "./_components/PostContainer";

function Client({ post }: { post: PrismaPostType }) {
  return <PostContainer post={post} />;
}
export default Client;
