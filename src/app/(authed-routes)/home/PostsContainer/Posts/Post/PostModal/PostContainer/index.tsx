import { PostLike } from "@prisma/client";
import {
  PrismaPostComment_WithLikes_withUser,
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
  postComments: PrismaPostComment_WithLikes_withUser[];
}) {
  const { medias } = post;

  return (
    <div
      className="flex bg-base-100"
      style={{ height: "calc(100% - 64px)" }}
      onClick={(e) => e.stopPropagation()}
    >
      <MediaContainer medias={medias} />
      <InfoContainer
        post={post}
        isPostLiked={isPostLiked}
        postLikes={postLikes}
        postComments={postComments}
      />
    </div>
  );
}
export default PostContainer;
