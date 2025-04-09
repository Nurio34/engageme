import { PrismaPostType } from "../../../../../../../../../../../prisma/types/post";
import LikeButton from "./LikeButton";

function ActionButtons({ post }: { post: PrismaPostType }) {
  return (
    <div className="h-12 flex justify-between items-center">
      <div className="flex justify-start items-center gap-x-4">
        <LikeButton post={post} />
        {/* <CommentButton post={post} />
        <ShareButton /> */}
      </div>
      {/* <SaveButton /> */}
    </div>
  );
}
export default ActionButtons;
