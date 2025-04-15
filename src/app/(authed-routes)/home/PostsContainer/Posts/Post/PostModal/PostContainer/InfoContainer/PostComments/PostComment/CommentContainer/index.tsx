import CreatedAt from "../../../../../../Header/CreatedAt";
import Name from "../../../../../../Header/Name";
import TotalCommentLikes from "./TotalCommentLikes";
import ReplyTheComment from "./ReplyTheComment";
import RepliesContainer from "./RepliesContainer";
import { PrismaPostCommentType } from "../../../../../../../../../../../../../prisma/types/post";

function CommentContainer({
  postComment,
}: {
  postComment: PrismaPostCommentType;
}) {
  const { user, comment, updatedAt, likes, id } = postComment;
  return (
    <div className="overflow-auto">
      <div>
        <div className="float-left mr-1 text-sm">
          <Name name={user.name} />
        </div>
        <p className="break-words text-sm">{comment}</p>
      </div>
      <div className="flex items-center gap-x-3 py-1">
        <CreatedAt updatedAt={updatedAt} />
        <TotalCommentLikes commentLikes={likes} />
        <ReplyTheComment id={id} name={user.name} isReplyToReply={false} />
      </div>
    </div>
  );
}
export default CommentContainer;
