import { PostCommentLike } from "@prisma/client";
import CreatedAt from "../../../../../../Header/CreatedAt";
import Name from "../../../../../../Header/Name";
import TotalCommentLikes from "./TotalCommentLikes";
import ReplyTheComment from "./ReplyTheComment";
import RepliesContainer from "./RepliesContainer";

function CommentContainer({
  name,
  comment,
  updatedAt,
  commentLikes,
}: {
  name: string;
  comment: string;
  updatedAt: Date;
  commentLikes: PostCommentLike[];
}) {
  return (
    <div className="overflow-auto">
      <div>
        <div className="float-left mr-2 text-sm">
          <Name name={name} />
        </div>
        <p className="break-words text-sm">{comment}</p>
      </div>
      <div className="flex items-center gap-x-3 py-1">
        <CreatedAt updatedAt={updatedAt} />
        <TotalCommentLikes commentLikes={commentLikes} />
        <ReplyTheComment />
      </div>
      <RepliesContainer />
    </div>
  );
}
export default CommentContainer;
