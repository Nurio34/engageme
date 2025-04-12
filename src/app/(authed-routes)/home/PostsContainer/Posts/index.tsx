"use client";

import { PrismaPostType } from "../../../../../../prisma/types/post";
import { Provider } from "react-redux";
import { store } from "@/store";
import { PostsProvider } from "./Context";
import PostsClient from "./Client";

function Posts({ posts }: { posts: PrismaPostType[] }) {
  return (
    <Provider store={store}>
      <PostsProvider posts={posts}>
        <PostsClient />
      </PostsProvider>
    </Provider>
  );
}
export default Posts;
