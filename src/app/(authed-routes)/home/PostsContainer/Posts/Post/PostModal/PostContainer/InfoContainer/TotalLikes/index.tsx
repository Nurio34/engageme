import { fancyNumber } from "@/utils/fancyNumebr";
import { PostLike } from "@prisma/client";

function TotalLikes({ postLikes }: { postLikes: PostLike[] }) {
  return (
    <p className="font-bold">
      {fancyNumber(postLikes.length)} like{postLikes.length > 1 && "s"}
    </p>
  );
}
export default TotalLikes;
