import { useUser } from "@clerk/nextjs";
import { PrismaPostType } from "../../../../../../../../../../prisma/types/post";
import Avatar from "../../../Header/Avatar";
import Header from "./Header";
import CreatedAt from "../../../Header/CreatedAt";
import PostComments from "./PostComments";
import CreatedAtLong from "./CreatedAtLong";
import CommentContainer from "./CommentContainer";
import { useState } from "react";
import Description from "./Description";
import ActionButtons from "./ActionButtons";
import TotalLikes from "../../../TotalLikes";
import SortComments from "./SortComments";

export type SortByType = "For You" | "Most Recent" | "Meta Verified";

function InfoContainer({ post }: { post: PrismaPostType }) {
  const { comments, user, updatedAt } = post;
  const { avatar } = user;

  const [isTruncated, setIsTruncated] = useState(false);
  const [textAreaHeight, setTextAreaHeight] = useState(0);

  const [sortBy, setSortBy] = useState<SortByType>("For You");

  return (
    <div className="w-[500px] flex flex-col">
      <Header post={post} />
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
            <Avatar avatar={avatar} />
            <div>
              <Description
                post={post}
                isTruncated={isTruncated}
                setIsTruncated={setIsTruncated}
              />
              <CreatedAt updatedAt={updatedAt} />
              <SortComments sortBy={sortBy} setSortBy={setSortBy} />
            </div>
          </div>
          <PostComments
            comments={comments}
            isTruncated={isTruncated}
            textAreaHeight={textAreaHeight}
            sortBy={sortBy}
          />
        </div>
        <div className="border-t-2 px-4 pb-2">
          <ActionButtons post={post} />
          <TotalLikes post={post} />
          <CreatedAtLong updatedAt={updatedAt} />
        </div>
        <CommentContainer post={post} setTextAreaHeight={setTextAreaHeight} />
      </div>
    </div>
  );
}
export default InfoContainer;
