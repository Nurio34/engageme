import { PrismaPostType } from "../../../../../../../../../../../prisma/types/post";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import ShareButton from "./ShareButton";

function ActionButtons({
  post,
  isPostLiked,
}: {
  post: PrismaPostType;
  isPostLiked: boolean;
}) {
  return (
    <div className="h-12 flex justify-between items-center">
      <div className="flex justify-start items-center gap-x-4">
        <LikeButton post={post} isPostLiked={isPostLiked} />
        <CommentButton />
        <ShareButton />
      </div>
      <SaveButton />
    </div>
  );
}
export default ActionButtons;
