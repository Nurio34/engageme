import { PrismaPostType } from "../../../../../../../prisma/types/post";
import Header from "./Header";
import Medias from "./Medias";

function Post({ post }: { post: PrismaPostType }) {
  return (
    <section className="w-full md:w-[468px] py-10 border-b-2">
      <Header post={post} />
      <Medias post={post} />
    </section>
  );
}
export default Post;
