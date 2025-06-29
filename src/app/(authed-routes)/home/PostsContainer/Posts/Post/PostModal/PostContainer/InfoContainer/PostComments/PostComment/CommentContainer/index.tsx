import Name from "../../../../../../Header/Name";
import TotalCommentLikes from "./TotalCommentLikes";
import ReplyTheComment from "./ReplyTheComment";
import { PrismaPostCommentType } from "../../../../../../../../../../../../../prisma/types/post";
import CreatedAt from "../../../_components/CreatedAt";

function CommentContainer({
  postComment,
}: {
  postComment: PrismaPostCommentType;
}) {
  const { user, comment, likes, id } = postComment;

  return (
    <div className="overflow-auto">
      <div>
        <div className="float-left mr-1 text-sm">
          <Name name={user.name} />
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
      </div>
    </div>
  );
}
export default CommentContainer;
