import {} from "@/store/hooks";
import { PrismaPostType } from "../../../../../../../../prisma/types/post";
import Medias from "./Medias";
import InfoContainer from "@/app/(authed-routes)/home/PostsContainer/Posts/Post/PostModal/PostContainer/InfoContainer";
// const UserModal = dynamic(
//   () => import("@/app/(authed-routes)/_globalComponents/UserModal")
// );

function Post({ post }: { post: PrismaPostType }) {
  const { medias } = post;

  return (
    <section className="flex lg:justify-center lg:py-9">
      <div className="lg:h-screen lg:max-h-[599px] w-full lg:w-auto flex flex-col lg:flex-row lg:border-2">
        <Medias medias={medias} />
        <InfoContainer post={post} page={"post"} />
        {/* <UserModal userId={post.userId}   /> */}
      </div>
    </section>
  );
}
export default Post;
