"use client";

import { useEffect, useState, useCallback } from "react";
import { getOtherPosts } from "../../../actions/getOtherPosts";
import { PostPreviewType } from "../../../../../../../../prisma/types/postPreview";
import Link from "next/link";
import PostPreview from "./PostPreview";
import LoadingSkeleton from "./LoadingSkeleton";

type FetchType = {
  isLoading: boolean;
  isError: boolean;
  posts: PostPreviewType[];
};

function OtherPostsOfUser({
  userId,
  username,
  postId,
}: {
  userId: string;
  username: string;
  postId: string;
}) {
  const [fetch, setFetch] = useState<FetchType>({
    isLoading: true,
    isError: false,
    posts: [],
  });

  const { isLoading, isError, posts } = fetch;

  const getOtherPostsAction = useCallback(async () => {
    setFetch((prev) => ({ ...prev, isLoading: true, isError: false }));

    try {
      const { status, posts } = await getOtherPosts(userId, postId, "post");

      if (status === "fail") {
        setFetch((prev) => ({ ...prev, isError: true }));
      } else {
        setFetch((prev) => ({ ...prev, posts }));
      }
    } catch (error) {
      setFetch((prev) => ({ ...prev, isError: true }));
      console.log(error);
    } finally {
      setFetch((prev) => ({ ...prev, isLoading: false }));
    }
  }, [userId, postId]);

  useEffect(() => {
    getOtherPostsAction();
  }, [getOtherPostsAction]);

  if (isLoading) return <LoadingSkeleton username={username} />;

  if (isError)
    return (
      <div className="flex justify-center items-center">
        <div className="space-y-2">
          <p className="font-semibold text-base-content/70 text-sm">
            Unexpected error happened while getting other posts of {username}
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={getOtherPostsAction}
          >
            Retry Getting Other Posts
          </button>
        </div>
      </div>
    );

  return (
    <section className="flex justify-center">
      <div className="pt-9 pb-[49px] border-t">
        <h1 className="flex items-start gap-x-1 pb-5">
          <p className="font-semibold text-sm text-base-content/60">
            More posts from
          </p>
          <Link
            className="font-semibold text-sm underline-offset-2 hover:underline"
            href={`/${username}`}
            prefetch
          >
            {username}
          </Link>
        </h1>
        <ul className="grid grid-cols-[repeat(3,minmax(0,307.67px))] gap-1">
          {posts.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
        </ul>
      </div>
    </section>
  );
}
export default OtherPostsOfUser;
