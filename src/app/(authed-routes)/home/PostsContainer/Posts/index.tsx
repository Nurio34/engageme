import { PrismaPostType } from "../../../../../../prisma/types/post";
import Post from "./Post";

function Posts({ posts }: { posts: PrismaPostType[] }) {
  return posts.map((post) => <Post key={post.id} post={post} />);
}
export default Posts;
