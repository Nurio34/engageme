"use client";

import { PrismaPostType } from "../../../../../../prisma/types/post";
import { Provider } from "react-redux";
import { store } from "@/store";
import { PostsProvider } from "./Context";
import PostsClient from "./Client";

function Posts({
  posts,
  variant,
}: {
  posts: PrismaPostType[];
  variant: string | undefined;
}) {
  return (
    <Provider store={store}>
      <PostsProvider posts={posts} variant={variant}>
        <PostsClient />
      </PostsProvider>
    </Provider>
  );
}
export default Posts;
