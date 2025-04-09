import { PostLike } from "@prisma/client";
import {
  PrismaPostCommentWithLikes,
  PrismaPostType,
} from "../../../../../../../../../prisma/types/post";
import MediaContainer from "./MediaContainer";
import InfoContainer from "./InfoContainer";

function PostContainer({
  post,
  postLikes,
  isPostLiked,
  postComments,
}: {
  post: PrismaPostType;
  postLikes: PostLike[];
  isPostLiked: boolean;
  postComments: PrismaPostCommentWithLikes[];
}) {
  const { medias } = post;

  return (
    <div
      className="flex bg-base-100"
      style={{ height: "calc(734px)" }}
      onClick={(e) => e.stopPropagation()}
    >
      <MediaContainer medias={medias} />
      <InfoContainer post={post} />
    </div>
  );
}
export default PostContainer;
