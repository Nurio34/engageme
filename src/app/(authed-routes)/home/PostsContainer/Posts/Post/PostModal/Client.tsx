import { PostLike } from "@prisma/client";
import {
  PrismaPostComment_WithLikes_withUser,
  PrismaPostType,
} from "../../../../../../../../prisma/types/post";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPostModal } from "@/store/slices/homePage";
import PostContainer from "./PostContainer";

function Client({
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
  const { postModal } = useAppSelector((s) => s.homePage);
  const { postId, isOpen } = postModal;

  const dispatch = useAppDispatch();

  return (
    post.id === postId &&
    isOpen && (
      <div
        className="fixed z-10 top-0 left-0 w-screen h-screen bg-base-content/70
          flex justify-center items-center
        "
        onClick={() => dispatch(setPostModal({ isOpen: false, postId: "" }))}
      >
        <PostContainer
          post={post}
          postLikes={postLikes}
          isPostLiked={isPostLiked}
          postComments={postComments}
        />
      </div>
    )
  );
}
export default Client;
