"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import Client from "./Client";
import { PrismaPostType } from "../../../../../../../../../prisma/types/post";

function CommentButton({ post }: { post: PrismaPostType }) {
  return (
    <Provider store={store}>
      <Client post={post} />
    </Provider>
  );
}
export default CommentButton;
