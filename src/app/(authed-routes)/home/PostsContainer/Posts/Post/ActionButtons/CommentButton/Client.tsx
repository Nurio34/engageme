"use client";

import CommentIcon from "@/app/_globalComponents/Svg/CommentIcon";
import { PrismaPostType } from "../../../../../../../../../prisma/types/post";
import { useAppDispatch } from "@/store/hooks";
import { setPostModal } from "@/store/slices/homePage";

function Client({ post }: { post: PrismaPostType }) {
  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      className="transition-colors hover:text-base-content/50"
      onClick={() => {
        dispatch(setPostModal({ isOpen: true, postId: post.id }));
        history.pushState({ isPostModalOpen: true }, "", window.location.href);
      }}
    >
      <CommentIcon />
    </button>
  );
}
export default Client;
