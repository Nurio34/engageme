import { FaHeart } from "react-icons/fa";
import { PrismaPostType } from "../../../../../../../../../../../../prisma/types/post";

function LikeButton({ post }: { post: PrismaPostType }) {
  return (
    <p>
      <FaHeart />
    </p>
  );
}
export default LikeButton;
