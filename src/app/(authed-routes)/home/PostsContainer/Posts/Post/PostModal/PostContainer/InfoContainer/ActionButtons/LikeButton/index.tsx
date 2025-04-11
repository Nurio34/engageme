import { FaHeart, FaRegHeart } from "react-icons/fa";
import { PrismaPostType } from "../../../../../../../../../../../../prisma/types/post";

function LikeButton({
  post,
  isPostLiked,
}: {
  post: PrismaPostType;
  isPostLiked: boolean;
}) {
  return isPostLiked ? (
    <button type="button">
      <FaHeart size={24} color="red" className="RemoveLike" />
    </button>
  ) : (
    <button type="button">
      <FaRegHeart size={24} className="Like" />
    </button>
  );
}
export default LikeButton;
