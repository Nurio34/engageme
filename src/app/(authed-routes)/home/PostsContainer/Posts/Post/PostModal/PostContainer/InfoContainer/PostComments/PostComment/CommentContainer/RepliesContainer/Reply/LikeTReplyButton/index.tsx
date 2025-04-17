import { usePostsContext } from "@/app/(authed-routes)/home/PostsContainer/Posts/Context";
import { useAppSelector } from "@/store/hooks";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  PrismaPostCommentType,
  PrismaReplyCommentType,
} from "../../../../../../../../../../../../../../../../prisma/types/post";
import { useState } from "react";

function LikeReplyButton({
  reply,
  postComment,
  commentId,
}: {
  reply: PrismaReplyCommentType;
  postComment: PrismaPostCommentType;
  commentId: string;
}) {
  const { postId } = postComment;
  const { id: replyId, likes } = reply;

  const { id: userId } = useAppSelector((s) => s.user);
  const like = likes.find((likeObj) => likeObj.userId === userId);

  const { isReplyLiked, likeTheReplyAction, removeLikeFromReplyAction } =
    usePostsContext();

  const isReplyLikedState = isReplyLiked(postId, commentId, replyId);

  const [isLoading, setIsLoading] = useState(false);

  const handleReplyLike = () =>
    isReplyLikedState
      ? removeLikeFromReplyAction(
          setIsLoading,
          postId,
          commentId,
          replyId,
          like!
        )
      : likeTheReplyAction(postId, commentId, replyId, setIsLoading);

  return (
    <button type="button" onClick={handleReplyLike} disabled={isLoading}>
      {isReplyLikedState ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  );
}
export default LikeReplyButton;
