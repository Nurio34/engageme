import { PrismaPostType } from "../../../../../../../../../prisma/types/post";
import MediaContainer from "./MediaContainer";
import InfoContainer from "./InfoContainer";

function PostContainer({ post }: { post: PrismaPostType }) {
  const { medias } = post;

  return (
    <div
      className="flex bg-base-100"
      style={{ height: "calc(100% - 64px)" }}
      onClick={(e) => e.stopPropagation()}
    >
      <MediaContainer medias={medias} />
      <InfoContainer post={post} />
    </div>
  );
}
export default PostContainer;
