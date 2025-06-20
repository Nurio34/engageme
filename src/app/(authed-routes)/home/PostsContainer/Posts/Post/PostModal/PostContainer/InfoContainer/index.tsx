import { PrismaPostType } from "../../../../../../../../../../prisma/types/post";
import Header from "./Header";
import PostComments from "./PostComments";
import CreatedAtLong from "./CreatedAtLong";
import CommentContainer from "./CommentContainer";
import { useState } from "react";
import Description from "./Description";
import ActionButtons from "./ActionButtons";
import TotalLikes from "../../../TotalLikes";
import SortComments from "./SortComments";
import { InfoContainerContextProvider } from "./Context";
import Avatar from "./_components/Avatar";
import CreatedAt from "./_components/CreatedAt";

export type SortByType = "For You" | "Most Recent" | "Meta Verified";

function InfoContainer({ post, page }: { post: PrismaPostType; page: string }) {
  const [isTruncated, setIsTruncated] = useState(false);
  const [textAreaHeight, setTextAreaHeight] = useState(0);

  const [sortBy, setSortBy] = useState<SortByType>("For You");

  return (
    <InfoContainerContextProvider post={post} page={page}>
      <div
        className={`flex flex-col w-full bg-base-100
        ${
          page === "home"
            ? "lg:max-w-[500px]"
            : "lg:max-w-[335px] lg:border-l-2"
        }  
      `}
      >
        <Header post={post} />
        <div
          className="grow w-full
        grid grid-rows-[1fr,auto]
        "
        >
          <div
            className=" px-1 lg:px-4 py-1 lg:py-3
          flex flex-col 
          "
          >
            <div className="flex items-start gap-4 shadow-[0_20px_20px_-30px_black]">
              <Avatar />

              <div className="grow">
                <Description
                  post={post}
                  isTruncated={isTruncated}
                  setIsTruncated={setIsTruncated}
                />
                <CreatedAt />
                <SortComments sortBy={sortBy} setSortBy={setSortBy} />
              </div>
            </div>
            <PostComments
              isTruncated={isTruncated}
              textAreaHeight={textAreaHeight}
              sortBy={sortBy}
            />
          </div>
          <div className="border-t-2 px-2 lg:px-4 py-1 lg:pb-2">
            <ActionButtons post={post} />
            <TotalLikes post={post} />
            <CreatedAtLong />
          </div>
          <CommentContainer post={post} setTextAreaHeight={setTextAreaHeight} />
        </div>
      </div>
    </InfoContainerContextProvider>
  );
}
export default InfoContainer;
