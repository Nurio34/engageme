import { useState } from "react";
import { SentCommentType } from "../../client";
import { likeComment } from "@/app/actions/post/comment/likeComment";
import toast from "react-hot-toast";
import { removeLike } from "@/app/actions/post/comment/removeLike";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function Comment({
  comment,
  index,
  username,
}: {
  comment: SentCommentType;
  index: number;
  username: string | null | undefined;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const likeCommentAction = async (commentId: string) => {
    try {
      setIsLoading(true);

      const { status } = await likeComment(commentId);

      if (status === "fail")
        return toast.error(
          "Something went wrong while liking the comment ! Please try again..."
        );

      setIsLiked(true);
    } catch (error) {
      console.log(error);
      toast.error(
        "Unexpected error while liking the comment ! Please try again..."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const removeLikeAction = async (commentId: string) => {
    try {
      setIsLoading(true);

      const { status } = await removeLike(commentId);
      if (status === "fail")
        return toast.error(
          "Something went wrong while removing likefrom the comment ! Please try again..."
        );

      setIsLiked(false);
    } catch (error) {
      console.log(error);
      toast.error(
        "Unexpected error while removing likefrom the comment ! Please try again..."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div key={index} className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className=" font-bold">{username}</span>
        <p>{comment.comment}</p>
      </div>
      <button
        type="button"
        onClick={() =>
          isLiked ? removeLikeAction(comment.id) : likeCommentAction(comment.id)
        }
        disabled={isLoading}
      >
        {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
      </button>
    </div>
  );
}
export default Comment;
