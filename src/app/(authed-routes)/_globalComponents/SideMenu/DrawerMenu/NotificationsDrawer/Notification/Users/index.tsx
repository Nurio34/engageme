import { NotificationTypeInterface, User } from "../..";
import PostLikeNotification from "./PostLikeNotification";
import PostCommentNotification from "./PostCommentNotification";
import CommentLikeNotification from "./CommentLikeNotification";
import ReplyNotification from "./ReplyNotification";
import ReplyLikeNotification from "./ReplyLikeNotification";

function Users({
  users,
  createdAt,
  type,
  comment,
}: {
  users: User[];
  createdAt: Date;
  type: NotificationTypeInterface;
  comment: string | undefined;
}) {
  return (
    <div className="text-sm max-h-20 overflow-clip">
      {type === "postLikeNotification" ? (
        <PostLikeNotification users={users} createdAt={createdAt} />
      ) : type === "postCommentNotification" ? (
        <PostCommentNotification
          users={users}
          createdAt={createdAt}
          comment={comment}
        />
      ) : type === "commentLikeNotification" ? (
        <CommentLikeNotification
          users={users}
          createdAt={createdAt}
          comment={comment}
        />
      ) : type === "replyNotification" ? (
        <ReplyNotification
          users={users}
          createdAt={createdAt}
          comment={comment}
        />
      ) : type === "replyLikeNotification" ? (
        <ReplyLikeNotification
          users={users}
          createdAt={createdAt}
          comment={comment}
        />
      ) : (
        "ok"
      )}
    </div>
  );
}
export default Users;
