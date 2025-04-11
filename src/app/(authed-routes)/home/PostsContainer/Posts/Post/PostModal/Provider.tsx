"use client";

import { Provider } from "react-redux";
import Client from "./Client";
import { store } from "@/store";
import {
  PrismaPostComment_WithLikes_withUser,
  PrismaPostType,
} from "../../../../../../../../prisma/types/post";
import { PostLike } from "@prisma/client";

function ProviderComponent({
  post,
  postLikes,
  isPostLiked,
  postComments,
}: {
  post: PrismaPostType;
  postLikes: PostLike[];
  isPostLiked: boolean;
  postComments: PrismaPostComment_WithLikes_withUser[];
}) {
  return (
    <Provider store={store}>
      <Client
        post={post}
        postLikes={postLikes}
        isPostLiked={isPostLiked}
        postComments={postComments}
      />
    </Provider>
  );
}
export default ProviderComponent;
