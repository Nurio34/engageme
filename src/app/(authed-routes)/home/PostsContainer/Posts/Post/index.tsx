import { PrismaPostType } from "../../../../../../../prisma/types/post";
import ActionButtons from "./ActionButtons";
import AddComment from "./AddComment";
import Description from "./Description";
import Header from "./Header";
import Medias from "./Medias";
import TotalComments from "./TotalComments";
import TotalLikes from "./TotalLikes";

function Post({ post }: { post: PrismaPostType }) {
  return (
    <section className="w-full md:w-[468px] py-4 border-b-2">
      <Header post={post} />
      <Medias post={post} />
      <div className="px-2 md:px-0">
        <ActionButtons post={post} />
        <TotalLikes post={post} />
        <Description post={post} />
        <TotalComments />
        <AddComment post={post} />
      </div>
    </section>
  );
}
export default Post;
