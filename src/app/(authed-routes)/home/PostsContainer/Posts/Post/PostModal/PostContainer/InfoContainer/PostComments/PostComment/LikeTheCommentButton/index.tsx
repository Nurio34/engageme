import { likeComment } from "@/app/actions/post/comment/likeComment";
import { removeLike } from "@/app/actions/post/comment/removeLike";
import { useUser } from "@clerk/nextjs";
import { PostCommentLike } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function LikeTheCommentButton({
  isCommentLiked,
  commentId,
  setIsCommentLiked,
  setCommentLikes,
}: {
  isCommentLiked: boolean;
  commentId: string;
  setIsCommentLiked: Dispatch<SetStateAction<boolean>>;
  setCommentLikes: Dispatch<SetStateAction<PostCommentLike[]>>;
}) {
  const { user: clerkUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const likeTheComment = async () => {
    setIsLoading(true);

    try {
      const { status, postCommentLike } = await likeComment(commentId);
      console.log(postCommentLike);

      if (status === "success" && postCommentLike) {
        setIsCommentLiked(true);
        setCommentLikes((prev) => [...prev, postCommentLike]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeLikeFromTheComment = async () => {
    setIsLoading(true);

    try {
      const { status, postCommentLike } = await removeLike(commentId);
      console.log(postCommentLike);

      if (status === "success" && postCommentLike && clerkUser) {
        setIsCommentLiked(false);
        setCommentLikes((prev) =>
          prev.filter((likeObj) => likeObj.userId !== clerkUser.id)
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCommentLike = () =>
    isCommentLiked ? removeLikeFromTheComment() : likeTheComment();

  return (
    <button type="button" onClick={handleCommentLike} disabled={isLoading}>
      {isCommentLiked ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  );
}
export default LikeTheCommentButton;
