import { PrismaPostType } from "../../../../../../../prisma/types/post";
import ActionButtons from "./ActionButtons";
import AddComment from "./AddComment";
import Description from "./Description";
import Header from "./Header";
import Medias from "./Medias";
import TotalComments from "./TotalComments";
import TotalLikes from "./TotalLikes";
import dynamic from "next/dynamic";

const PostModal = dynamic(() => import("./PostModal"), {
  loading: () => null, // Or a spinner if you prefer
  ssr: false, // Most modals are client-only
});

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
