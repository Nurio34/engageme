import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  PrismaPostCommentType,
  PrismaPostType,
} from "../../../../../../../../../../prisma/types/post";
import { usePostsContext } from "../../../../Context";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";

function Comment({
  comment,
  username,
  post,
}: {
  comment: PrismaPostCommentType;
  username: string | null | undefined;
  post: PrismaPostType;
}) {
  const { isCommentLiked, likeCommentAction, removeLikeFromTheCommentAction } =
    usePostsContext();

  const { id } = useAppSelector((s) => s.user);

  const [isLoading, setIsLoading] = useState(false);

  const theComment = post.comments.find(
    (commentObj) => commentObj.id === comment.id
  );
  if (!theComment) return;
  const commentLike = theComment.likes.find(
    (likeObj) => likeObj.commentId === comment.id && likeObj.userId === id
  );

  const isCommentLikedState = isCommentLiked(post.id, comment.id);

  const handleCommentLike = () =>
    isCommentLikedState
      ? removeLikeFromTheCommentAction(post.id, commentLike!, setIsLoading)
      : likeCommentAction(post.id, comment.id, comment.userId, setIsLoading);

  return (
    <div className="flex items-center justify-between gap-x-2 ">
      <div className="grow overflow-auto">
        <span className="font-bold float-left mr-2">{username}</span>
        <p className="break-words">{comment.comment}</p>
      </div>
      <button type="button" onClick={handleCommentLike} disabled={isLoading}>
        {isCommentLikedState ? <FaHeart color="red" /> : <FaRegHeart />}
      </button>
    </div>
  );
}
export default Comment;
