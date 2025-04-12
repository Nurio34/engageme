import { usePostsContext } from "@/app/(authed-routes)/home/PostsContainer/Posts/Context";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { PrismaPostCommentType } from "../../../../../../../../../../../../../prisma/types/post";

function LikeTheCommentButton({
  postComment,
}: {
  postComment: PrismaPostCommentType;
}) {
  const {
    isCommentLiked,
    likeCommentAction,
    removeLikeFromTheCommentAction,
    isLoading_LikeComment,
  } = usePostsContext();
  const isCommentLikedState = isCommentLiked(
    postComment.postId,
    postComment.id
  );

  const handleCommentLike = () =>
    isCommentLikedState
      ? removeLikeFromTheCommentAction(postComment.postId, postComment.id)
      : likeCommentAction(postComment.postId, postComment.id);

  return (
    <button
      type="button"
      className="mt-1"
      onClick={handleCommentLike}
      disabled={isLoading_LikeComment}
    >
      {isCommentLikedState ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  );
}
export default LikeTheCommentButton;
