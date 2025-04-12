"use client";

import Post from "./Post";
import { usePostsContext } from "./Context";

function PostsClient() {
  const { postsState } = usePostsContext();

  return postsState.map((post) => <Post key={post.id} post={post} />);
}
export default PostsClient;
