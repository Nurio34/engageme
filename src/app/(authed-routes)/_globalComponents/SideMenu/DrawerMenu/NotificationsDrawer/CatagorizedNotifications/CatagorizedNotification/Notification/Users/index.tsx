import PostLikeNotification from "./PostLikeNotification";
import PostCommentNotification from "./PostCommentNotification";
import CommentLikeNotification from "./CommentLikeNotification";
import ReplyNotification from "./ReplyNotification";
import ReplyLikeNotification from "./ReplyLikeNotification";
import { NotificationTypeInterface, User } from "../../../../../types";
import FollowNotification from "./FollowNotification";

function Users({
  users,
  createdAt,
  type,
  comment,
  isFollowed,
}: {
  users: User[];
  createdAt: Date;
  type: NotificationTypeInterface;
  comment: string | undefined;
  isFollowed: boolean | undefined;
}) {
  return (
    <div
      className={`text-sm max-h-20 overflow-clip
      ${type === "followNotification" ? "col-start-2 col-end-4" : ""}
    `}
    >
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
        <FollowNotification
          users={users}
          createdAt={createdAt}
          isFollowed={isFollowed}
        />
      )}
    </div>
  );
}
export default Users;
