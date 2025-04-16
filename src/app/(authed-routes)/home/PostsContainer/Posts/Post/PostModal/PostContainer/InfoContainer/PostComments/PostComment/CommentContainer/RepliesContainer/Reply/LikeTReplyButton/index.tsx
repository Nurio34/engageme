import { usePostsContext } from "@/app/(authed-routes)/home/PostsContainer/Posts/Context";
import { likeReply } from "@/app/actions/post/reply/likeReply";
import { useAppSelector } from "@/store/hooks";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  PrismaPostCommentType,
  PrismaReplyCommentType,
} from "../../../../../../../../../../../../../../../../prisma/types/post";
import { ReplyCommentLike } from "@prisma/client";
import toast from "react-hot-toast";
import { useState } from "react";
import { removeLikeFromReply } from "@/app/actions/post/reply/removeLikeFromReply";

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

  const {
    setPostsState,
    postsState,
    isReplyLiked,
    likeTheReplyAction,
    removeLikeFromReplyAction,
  } = usePostsContext();

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
