"use client";

import Post from "./Post";
import { usePostsContext } from "./Context";
import { useEffect, useRef } from "react";
import { getPostsAction } from "./actions/getPostsAction";
import SuggestedForYouList from "@/app/(authed-routes)/_globalComponents/SuggestedForYouList";
import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";
import StarOutlineInCircleIcon from "@/app/_globalComponents/Svg/StarOutlineInCircleIcon";
import { SlUserFollow } from "react-icons/sl";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSkip } from "@/store/slices/following";

function PostsClient({
  recomendations,
}: {
  recomendations: PrismaRecomendationType[];
}) {
  const { skip } = useAppSelector((s) => s.following);
  const dispatch = useAppDispatch();

  const { posts, variant, postsState, setPostsState } = usePostsContext();

  const isFetchingRef = useRef(false);
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
          const { status, posts } = await getPostsAction(skip, variant);

          if (status === "fail") {
            timeoutRef.current = setTimeout(() => {
              getPostsFN();
              isFetchingRef.current = false;
            }, 3000);
            return;
          }

          setPostsState((prev) => [...prev, ...posts]);
          dispatch(setSkip(variant));
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
  }, [skip, variant]);

  if (posts.length === 0)
    return (
      <div className="w-full ">
        {variant === "followings" && (
          <div className="text-sm grid justify-items-center gap-y-4 py-6 px-11 text-center">
            <div
              className="w-24 aspect-square rounded-full border-2 border-base-content
              flex justify-center items-center text-4xl
            "
            >
              <SlUserFollow />
            </div>
            <h2 className="text-xl">See posts from people you follow</h2>
            <p>
              Posts from accounts you follow will appear here in the order
              they’re shared.
            </p>
          </div>
        )}
        {variant === "favorites" && (
          <div className="text-sm grid justify-items-center gap-y-4 py-6 px-11 text-center">
            <StarOutlineInCircleIcon />
            <h2 className="text-xl">
              Choose the accounts you can&apos;t miss out on
            </h2>
            <p>
              Add accounts to your favorites to see their posts here, starting
              with the most recent posts.
            </p>
          </div>
        )}
        <SuggestedForYouList maxWidth={400} recomendations={recomendations} />
      </div>
    );

  return postsState.map((post, index) => (
    <Post key={post.id} index={index} post={post} />
  ));
}

export default PostsClient;
