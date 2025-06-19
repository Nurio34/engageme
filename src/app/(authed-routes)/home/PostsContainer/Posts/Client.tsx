"use client";

import Post from "./Post";
import { usePostsContext } from "./Context";
import { useEffect, useRef } from "react";
import { getPostsAction } from "./actions/getPostsAction";

function PostsClient() {
  const { postsState, setPostsState, skip, setSkip } = usePostsContext();

  const isFetchingRef = useRef(false); // ✅ to avoid re-renders
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const isAtBottom =
        scrollTop + windowHeight >= documentHeight - window.innerHeight;

      if (isAtBottom && !isFetchingRef.current) {
        isFetchingRef.current = true;

        const getPostsFN = async () => {
          const { status, posts } = await getPostsAction(skip);

          if (status === "fail") {
            timeoutRef.current = setTimeout(() => {
              getPostsFN();
              isFetchingRef.current = false;
            }, 3000);
            return;
          }

          setPostsState((prev) => [...prev, ...posts]);
          setSkip((prev) => prev + 1);
          isFetchingRef.current = false;
        };

        getPostsFN();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [skip]);

  return postsState.map((post, index) => (
    <Post key={post.id} index={index} post={post} />
  ));
}

export default PostsClient;
