import TotalCommentLikes from "./TotalCommentLikes";
import ReplyTheComment from "./ReplyTheComment";
import { PrismaPostCommentType } from "../../../../../../../../../../../../../prisma/types/post";
import CreatedAt from "../../../_components/CreatedAt";
import Name from "../../../_components/Name";
import { Dispatch, RefObject, SetStateAction } from "react";
import { useAppSelector } from "@/store/hooks";
import { useInfoContext } from "../../../Context";
import CommentSettingsContainer from "./CommentSettingsContainer";

function CommentContainer({
  postComment,
  setIsContainerHovered,
  ScrollableContainerRef,
}: {
  postComment: PrismaPostCommentType;
  setIsContainerHovered: Dispatch<SetStateAction<boolean>>;
  ScrollableContainerRef: RefObject<HTMLUListElement | null>;
}) {
  const { postsState } = useInfoContext();

  const { user, comment, likes, id } = postComment;
  const { id: userId } = useAppSelector((s) => s.user);

  const isSelfPost = postsState[0].userId === userId;
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
        {isSelfPost ? (
          <CommentSettingsContainer postComment={postComment} />
        ) : isSelfComment ? (
          <CommentSettingsContainer postComment={postComment} />
        ) : null}
      </div>
    </div>
  );
}
export default CommentContainer;
