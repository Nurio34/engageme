import { useAppDispatch } from "@/store/hooks";
import { PrismaPostType } from "../../../../../../../../prisma/types/post";
import { fancyNumber } from "@/utils/fancyNumebr";
import { setPostModal } from "@/store/slices/homePage";

function TotalComments({ post }: { post: PrismaPostType }) {
  const { comments } = post;

  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      className="mt-2 text-sm text-base-content/50"
      onClick={() => dispatch(setPostModal({ isOpen: true, postId: post.id }))}
    >
      View all {fancyNumber(comments.length)} comments
    </button>
  );
}
export default TotalComments;
