"use client";

import { PrismaPostType } from "../../../../../../prisma/types/post";
import { Provider } from "react-redux";
import { store } from "@/store";
import { PostsProvider } from "./Context";
import PostsClient from "./Client";
import { PrismaRecomendationType } from "../../../../../../prisma/types/recomendation";

function Posts({
  posts,
  variant,
  recomendations,
}: {
  posts: PrismaPostType[];
  variant: string | undefined;
  recomendations: PrismaRecomendationType[];
}) {
  return (
    <Provider store={store}>
      <PostsProvider posts={posts} variant={variant}>
        <PostsClient recomendations={recomendations} />
      </PostsProvider>
    </Provider>
  );
}
export default Posts;
