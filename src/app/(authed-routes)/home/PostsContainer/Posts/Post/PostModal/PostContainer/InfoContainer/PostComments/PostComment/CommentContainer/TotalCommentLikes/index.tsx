import { PostCommentLike } from "@prisma/client";

function TotalCommentLikes({
  commentLikes,
}: {
  commentLikes: PostCommentLike[];
}) {
  return (
    <p className="text-sm font-semibold text-base-content/60">
      {commentLikes.length} like{commentLikes.length > 1 && "s"}
    </p>
  );
}
export default TotalCommentLikes;
