import { PrismaPostType } from "../../../../../../../prisma/types/post";
import ActionButtons from "./ActionButtons";
import AddComment from "./AddComment";
import Description from "./Description";
import Header from "./Header";
import Medias from "./Medias";
import PostModal from "./PostModal";
import TotalComments from "./TotalComments";
import TotalLikes from "./TotalLikes";

function Post({ index, post }: { index: number; post: PrismaPostType }) {
  return (
    <section className="w-full md:w-[468px] py-4 border-b-2">
      <Header post={post} />
      <Medias index={index} post={post} />
      <div className="px-2 md:px-0">
        <ActionButtons post={post} />
        <TotalLikes post={post} />
        <Description post={post} />
        <TotalComments post={post} />
        <AddComment post={post} />
      </div>
      <PostModal post={post} />
    </section>
  );
}
export default Post;
