"use client";

import Post from "./Post";
import { usePostsContext } from "./Context";
import { useEffect } from "react";
import { getPostsAction } from "./actions/getPostsAction";

function PostsClient() {
  const { postsState, setPostsState, skip, setSkip } = usePostsContext();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const isAtBottom = scrollTop + windowHeight >= documentHeight - 500; // 10px tolerance
      if (isAtBottom) {
        const getPostsFN = async () => {
          const { status, posts } = await getPostsAction(skip);

          if (status === "fail") return getPostsFN();
          setPostsState((prev) => [...prev, ...posts]);
          setSkip((prev) => prev + 1);
        };
        getPostsFN();
      }
    };

    window.addEventListener("scrollend", handleScroll);
    return () => window.removeEventListener("scrollend", handleScroll);
  }, [skip]); // Only depend on skip, not postsState

  return postsState.map((post, index) => (
    <Post key={post.id} index={index} post={post} />
  ));
}

export default PostsClient;
