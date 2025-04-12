import { PrismaPostType } from "../../../../../../../../prisma/types/post";
import { fancyNumber } from "@/utils/fancyNumebr";

function TotalLikes({ post }: { post: PrismaPostType }) {
  const { likes } = post;

  return (
    <p className="text-sm font-semibold">
      {fancyNumber(likes.length)} {likes.length > 1 ? "likes" : "like"}
    </p>
  );
}
export default TotalLikes;
