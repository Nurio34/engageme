import { getCommentsOfThePost } from "@/app/api/comment/handlers/getCommentsOfThePost";
import { PrismaPostType } from "../../../../../../../../prisma/types/post";

async function TotalComments({ post }: { post: PrismaPostType }) {
  const { status, postComments } = await getCommentsOfThePost(post.id);

  if (status === "fail")
    return (
      <p className="mt-2 text-sm text-base-content/50">View all comments</p>
    );

  return (
    <button type="button" className="mt-2 text-sm text-base-content/50">
      View all {postComments.length} comments
    </button>
  );
}
export default TotalComments;
