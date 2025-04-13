"use client";

import Post from "./Post";
import { usePostsContext } from "./Context";

function PostsClient() {
  const { postsState } = usePostsContext();

  return postsState.map((post, index) => (
    <Post key={post.id} index={index} post={post} />
  ));
}
export default PostsClient;
