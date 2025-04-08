"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import Client from "./client";
import { PrismaPostType } from "../../../../../../../../prisma/types/post";

function AddComment({ post }: { post: PrismaPostType }) {
  return (
    <Provider store={store}>
      <Client post={post} />
    </Provider>
  );
}
export default AddComment;
