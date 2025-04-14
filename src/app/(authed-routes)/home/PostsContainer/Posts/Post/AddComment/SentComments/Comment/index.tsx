import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  PrismaPostCommentType,
  PrismaPostType,
} from "../../../../../../../../../../prisma/types/post";
import { usePostsContext } from "../../../../Context";
import { useAppSelector } from "@/store/hooks";

function Comment({
  comment,
  username,
  post,
}: {
  comment: PrismaPostCommentType;
  username: string | null | undefined;
  post: PrismaPostType;
}) {
  const {
    isCommentLiked,
    likeCommentAction,
    removeLikeFromTheCommentAction,
    isLoading_LikeComment,
  } = usePostsContext();

  const { id } = useAppSelector((s) => s.user);

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
      ? removeLikeFromTheCommentAction(post.id, commentLike!)
      : likeCommentAction(post.id, comment.id);

  return (
    <div className="flex items-center justify-between gap-x-2 ">
      <div className="grow overflow-auto">
        <span className="font-bold float-left mr-2">{username}</span>
        <p className="break-words">{comment.comment}</p>
      </div>
      <button
        type="button"
        onClick={handleCommentLike}
        disabled={isLoading_LikeComment}
      >
        {isCommentLikedState ? <FaHeart color="red" /> : <FaRegHeart />}
      </button>
    </div>
  );
}
export default Comment;
