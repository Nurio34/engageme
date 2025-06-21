"use client";

import { Provider } from "react-redux";
import { ContextProvider } from "./Context";
import Client from "./Client";
import { store } from "@/store";
import { PrismaPostType } from "../../../../../../../prisma/types/post";

function PostContainer({ post }: { post: PrismaPostType }) {
  return (
    <Provider store={store}>
      <ContextProvider>
        <Client post={post} />
      </ContextProvider>
    </Provider>
  );
}
export default PostContainer;
