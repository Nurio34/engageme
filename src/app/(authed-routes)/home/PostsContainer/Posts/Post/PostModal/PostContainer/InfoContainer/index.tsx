import { useUser } from "@clerk/nextjs";
import {
  PrismaPostComment_WithLikes_withUser,
  PrismaPostType,
} from "../../../../../../../../../../prisma/types/post";
import Avatar from "../../../Header/Avatar";
import Header from "./Header";
import CreatedAt from "../../../Header/CreatedAt";
import PostComments from "./PostComments";
import ActionButtons from "./ActionButtons";
import TotalLikes from "./TotalLikes";
import { PostLike } from "@prisma/client";
import CreatedAtLong from "./CreatedAtLong";
import CommentContainer from "./CommentContainer";
import { useState } from "react";
import Description from "./Description";

function InfoContainer({
  post,
  isPostLiked,
  postLikes,
  postComments,
}: {
  post: PrismaPostType;
  isPostLiked: boolean;
  postLikes: PostLike[];
  postComments: PrismaPostComment_WithLikes_withUser[];
}) {
  const [isTruncated, setIsTruncated] = useState(false);

  const { user } = useUser();
  if (!user) return;

  const { imageUrl } = user;
  const { updatedAt } = post;

  return (
    <div className="w-[500px] flex flex-col">
      <Header />
      <div
        className="grow w-full
        grid grid-rows-[1fr,auto]
      "
      >
        <div
          className=" px-4 py-3
          flex flex-col
        "
        >
          <div className="flex items-start gap-4">
            <Avatar avatar={imageUrl} />
            <div>
              <Description
                post={post}
                isTruncated={isTruncated}
                setIsTruncated={setIsTruncated}
              />
              <CreatedAt updatedAt={updatedAt} />
            </div>
          </div>
          <PostComments postComments={postComments} isTruncated={isTruncated} />
        </div>
        <div className="border-t-2 px-4 pb-2">
          <ActionButtons post={post} isPostLiked={isPostLiked} />
          <TotalLikes postLikes={postLikes} />
          <CreatedAtLong updatedAt={updatedAt} />
        </div>
        <CommentContainer />
      </div>
    </div>
  );
}
export default InfoContainer;
