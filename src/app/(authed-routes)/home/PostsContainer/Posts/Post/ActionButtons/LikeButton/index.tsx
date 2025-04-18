import { PrismaPostType } from "../../../../../../../../../prisma/types/post";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { usePostsContext } from "../../../Context";
import "./index.css";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";

function LikeButton({ post }: { post: PrismaPostType }) {
  const { id: postId, likes, userId: postOwnerId } = post;

  const { id: userId } = useAppSelector((s) => s.user);

  const like = likes.find(
    (likeObj) => likeObj.postId === postId && likeObj.userId === userId
  );

  const [isLoading, setIsLoading] = useState(false);

  const { isPostLiked, likeThePostAction, removeLikeFromThePostAction } =
    usePostsContext();

  const isPostLikedState = isPostLiked(postId);

  const handleLike = () =>
    isPostLikedState
      ? removeLikeFromThePostAction(like!, postOwnerId, setIsLoading)
      : likeThePostAction(postId, postOwnerId, setIsLoading);

  return (
    <button type="button" onClick={handleLike} disabled={isLoading}>
      {isPostLikedState ? (
        <FaHeart color="red" size={24} className="RemoveLike" />
      ) : (
        <FaRegHeart size={24} className="Like" />
      )}
    </button>
  );
}
export default LikeButton;
