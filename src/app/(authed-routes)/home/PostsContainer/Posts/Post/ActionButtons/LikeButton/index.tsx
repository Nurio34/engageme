import { PrismaPostType } from "../../../../../../../../../prisma/types/post";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { usePostsContext } from "../../../Context";
import "./index.css";
import { useAppSelector } from "@/store/hooks";

function LikeButton({ post }: { post: PrismaPostType }) {
  const { id, likes } = post;

  const { id: userId } = useAppSelector((s) => s.user);

  const like = likes.find(
    (likeObj) => likeObj.postId === id && likeObj.userId === userId
  );

  const {
    isPostLiked,
    likeThePostAction,
    removeLikeFromThePostAction,
    isLoading_LikePost,
  } = usePostsContext();

  const isPostLikedState = isPostLiked(id);

  const handleLike = () =>
    isPostLikedState
      ? removeLikeFromThePostAction(like!)
      : likeThePostAction(id);

  return (
    <button type="button" onClick={handleLike} disabled={isLoading_LikePost}>
      {isPostLikedState ? (
        <FaHeart color="red" size={24} className="RemoveLike" />
      ) : (
        <FaRegHeart size={24} className="Like" />
      )}
    </button>
  );
}
export default LikeButton;
