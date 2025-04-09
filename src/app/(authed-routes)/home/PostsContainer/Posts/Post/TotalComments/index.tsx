import { getComments } from "@/app/api/comment/handlers/getComments";
import { PrismaPostType } from "../../../../../../../../prisma/types/post";

async function TotalComments({ post }: { post: PrismaPostType }) {
  const { status, comments } = await getComments(post.id);

  if (status === "fail")
    return (
      <p className="mt-2 text-sm text-base-content/50">View all comments</p>
    );

  return (
    <button type="button" className="mt-2 text-sm text-base-content/50">
      View all {comments.length} comments
    </button>
  );
}
export default TotalComments;
