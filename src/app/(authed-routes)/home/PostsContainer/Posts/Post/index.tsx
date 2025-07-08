import { useObserveVisibility } from "@/hooks/useObserveVisibility";
import { PrismaPostType } from "../../../../../../../prisma/types/post";
import ActionButtons from "./ActionButtons";
import AddComment from "./AddComment";
import Description from "./Description";
import Header from "./Header";
import Medias from "./Medias";
import TotalComments from "./TotalComments";
import TotalLikes from "./TotalLikes";
import dynamic from "next/dynamic";
import { useState } from "react";
import { PrismaRecomendationType } from "../../../../../../../prisma/types/recomendation";

const PostModal = dynamic(() => import("./PostModal"), {
  loading: () => null,
  ssr: false,
});

const UserModal = dynamic(
  () => import("@/app/(authed-routes)/_globalComponents/UserModal"),
  {
    loading: () => null,
    ssr: false,
  }
);

function Post({ index, post }: { index: number; post: PrismaPostType }) {
  const { containerRef, isVisible } = useObserveVisibility();
  const [isContainerHovered, setIsContainerHovered] = useState(false);

  const { user } = post;
  const { userId, name, avatar, fullname, _count, posts, followers } = user;
  const recomendation: PrismaRecomendationType = {
    userId,
    name,
    avatar,
    fullname,
    _count,
    posts,
    followers,
  };

  return (
    <section ref={containerRef} className="w-full md:w-[468px] py-4 border-b-2">
      <Header post={post} setIsContainerHovered={setIsContainerHovered} />
      <Medias index={index} post={post} />
      <div className="px-2 md:px-0">
        <ActionButtons post={post} />
        <TotalLikes post={post} />
        <Description
          post={post}
          setIsContainerHovered={setIsContainerHovered}
        />
        <TotalComments post={post} />
        <AddComment post={post} />
      </div>
      <PostModal post={post} />
      {isVisible && (
        <UserModal
          userId={post.userId}
          isContainerHovered={isContainerHovered}
          setIsContainerHovered={setIsContainerHovered}
          recomendation={recomendation}
        />
      )}
    </section>
  );
}
export default Post;
