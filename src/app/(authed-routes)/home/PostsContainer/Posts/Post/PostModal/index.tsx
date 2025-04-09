import { PrismaPostType } from "../../../../../../../../prisma/types/post";
import { currentUser } from "@clerk/nextjs/server";
import { getLikesOfThePost } from "@/app/api/like/handler/getLikesOfThePost";
import { getCommentsOfThePost } from "@/app/api/comment/handlers/getCommentsOfThePost";
import ProviderComponent from "./Provider";

async function PostModal({ post }: { post: PrismaPostType }) {
  const user = await currentUser();
  if (!user) return;

  const { status, postLikes, isPostLiked } = await getLikesOfThePost(
    post.id,
    user.id
  );
  if (status === "fail") return;

  const { status: status2, postComments } = await getCommentsOfThePost(post.id);
  if (status2 === "fail") return;

  return (
    <ProviderComponent
      post={post}
      postLikes={postLikes}
      isPostLiked={isPostLiked}
      postComments={postComments}
    />
  );
}
export default PostModal;
