import { FaHeart, FaRegHeart } from "react-icons/fa";
import { PrismaPostCommentType } from "../../../../../../../../../../../../../prisma/types/post";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import { useInfoContext } from "../../../Context";

function LikeTheCommentButton({
  postComment,
}: {
  postComment: PrismaPostCommentType;
}) {
  const { isCommentLiked, likeCommentAction, removeLikeFromTheCommentAction } =
    useInfoContext();

  const { id } = useAppSelector((s) => s.user);

  const [isLoading, setIsLoading] = useState(false);

  const commentLike = postComment.likes.find(
    (likeObj) => likeObj.commentId === postComment.id && likeObj.userId === id
  );

  const isCommentLikedState = isCommentLiked(
    postComment.postId,
    postComment.id
  );

  const handleCommentLike = () =>
    isCommentLikedState
      ? removeLikeFromTheCommentAction(
          postComment.postId,
          commentLike!,
          setIsLoading
        )
      : likeCommentAction(
          postComment.postId,
          postComment.id,
          postComment.userId,
          setIsLoading
        );

  return (
    <button
      type="button"
      className="mt-1"
      onClick={handleCommentLike}
      disabled={isLoading}
    >
      {isCommentLikedState ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  );
}
export default LikeTheCommentButton;
