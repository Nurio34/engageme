import { PrismaPostType } from "../../../../../../../../prisma/types/post";

function TotalLikes({ post }: { post: PrismaPostType }) {
  const { likes } = post;
  const totalLikes = likes.length;
  return <p className="text-sm font-semibold">{totalLikes} likes</p>;
}
export default TotalLikes;
