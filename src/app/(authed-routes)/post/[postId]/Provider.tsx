"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import { PrismaPostType } from "../../../../../prisma/types/post";
import Client from "./Client";
import { ContextProvider } from "./Context";

function ProviderComponent({ post }: { post: PrismaPostType }) {
  return (
    <Provider store={store}>
      <ContextProvider>
        <Client post={post} />
      </ContextProvider>
    </Provider>
  );
}
export default ProviderComponent;
