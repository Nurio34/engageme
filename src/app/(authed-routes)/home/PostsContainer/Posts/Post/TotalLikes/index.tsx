import { currentUser } from "@clerk/nextjs/server";
import { PrismaPostType } from "../../../../../../../../prisma/types/post";
import { getLikesOfThePost } from "@/app/api/like/handler/getLikesOfThePost";
import { fancyNumber } from "@/utils/fancyNumebr";

async function TotalLikes({ post }: { post: PrismaPostType }) {
  const user = await currentUser();

  if (!user) return <p className="text-sm font-semibold">0 like</p>;

  const { status, postLikes } = await getLikesOfThePost(post.id, user.id);

  if (status === "fail") return <p className="text-sm font-semibold">0 like</p>;

  return (
    <p className="text-sm font-semibold">
      {fancyNumber(postLikes.length)} {postLikes.length > 1 ? "likes" : "like"}
    </p>
  );
}
export default TotalLikes;
