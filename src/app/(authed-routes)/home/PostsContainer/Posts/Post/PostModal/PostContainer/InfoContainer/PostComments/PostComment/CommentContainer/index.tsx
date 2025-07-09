import TotalCommentLikes from "./TotalCommentLikes";
import ReplyTheComment from "./ReplyTheComment";
import { PrismaPostCommentType } from "../../../../../../../../../../../../../prisma/types/post";
import CreatedAt from "../../../_components/CreatedAt";
import Name from "../../../_components/Name";
import { Dispatch, RefObject, SetStateAction } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useAppSelector } from "@/store/hooks";

function CommentContainer({
  postComment,
  setIsContainerHovered,
  ScrollableContainerRef,
}: {
  postComment: PrismaPostCommentType;
  setIsContainerHovered: Dispatch<SetStateAction<boolean>>;
  ScrollableContainerRef: RefObject<HTMLUListElement | null>;
}) {
  const { user, comment, likes, id } = postComment;
  const { id: userId } = useAppSelector((s) => s.user);

  const isSelfComment = user.userId === userId;

  return (
    <div className="overflow-auto">
      <div>
        <div className="float-left mr-1 text-sm">
          <Name
            name={user.name}
            setIsContainerHovered={setIsContainerHovered}
            ScrollableContainerRef={ScrollableContainerRef}
          />
        </div>
        <p className="break-words text-sm">{comment}</p>
      </div>
      <div className="flex items-center gap-x-3 py-1">
        <CreatedAt />
        <TotalCommentLikes commentLikes={likes} />
        <ReplyTheComment
          commentId={id}
          commentOwnerId={postComment.userId}
          name={user.name}
          isReplyToReply={false}
        />
        {isSelfComment && (
          <button type="button">
            <BsThreeDots />
          </button>
        )}
      </div>
    </div>
  );
}
export default CommentContainer;
