import { PrismaPostType } from "../../../../../../../../../prisma/types/post";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./index.css";
import { getLikesOfThePost } from "@/app/api/like/handler/getLikesOfThePost";
import { currentUser } from "@clerk/nextjs/server";
import { removeLike } from "@/app/actions/post/like/removeLike";
import { likeThePost } from "@/app/actions/post/like/likeThePost";

async function LikeButton({ post }: { post: PrismaPostType }) {
  const user = await currentUser();

  if (!user) return <FaRegHeart size={24} />;

  const { status, isPostLiked } = await getLikesOfThePost(post.id, user.id);

  if (status === "fail") return <FaRegHeart size={24} />;

  if (isPostLiked)
    return (
      <form action={removeLike} className="flex items-center">
        <input type="hidden" name="postId" value={post.id} />
        <button type="submit" className="RemoveLike">
          <FaHeart size={24} color="red" />
        </button>
      </form>
    );

  return (
    <form action={likeThePost} className="flex items-center">
      <input type="hidden" name="postId" value={post.id} />
      <button type="submit" className="Like">
        <FaRegHeart size={24} />
      </button>
    </form>
  );
}
export default LikeButton;
