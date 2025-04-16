import Avatar from "@/app/(authed-routes)/home/PostsContainer/Posts/Post/Header/Avatar";
import {
  PrismaPostCommentType,
  PrismaReplyCommentType,
} from "../../../../../../../../../../../../../../../prisma/types/post";
import Name from "@/app/(authed-routes)/home/PostsContainer/Posts/Post/Header/Name";
import CreatedAt from "@/app/(authed-routes)/home/PostsContainer/Posts/Post/Header/CreatedAt";
import TotalCommentLikes from "../../TotalCommentLikes";
import ReplyTheComment from "../../ReplyTheComment";
import LikeReplyButton from "./LikeTReplyButton";

function Reply({
  postComment,
  reply,
}: {
  postComment: PrismaPostCommentType;
  reply: PrismaReplyCommentType;
}) {
  const { user, comment, createdAt, likes, replyToName, id, commentId } = reply;

  return (
    <li className="flex items-start gap-x-2">
      <Avatar avatar={user.avatar} />
      <div className="grow space-y-2 min-w-0">
        <div>
          <div className="float-left mr-1 text-sm">
            <Name name={user.name} />
          </div>
          <p className="text-sm break-words w-full max-w-full">
            {replyToName && (
              <span className="text-info mr-1">@{replyToName}</span>
            )}
            {comment}
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          <CreatedAt updatedAt={createdAt} />
          <TotalCommentLikes commentLikes={likes} />
          <ReplyTheComment
            commentId={postComment.id}
            name={user.name}
            isReplyToReply={true}
            replyOwnerId={reply.userId}
          />
        </div>
      </div>
      <LikeReplyButton
        reply={reply}
        postComment={postComment}
        commentId={commentId}
      />
    </li>
  );
}
export default Reply;
