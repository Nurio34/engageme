import { NotificationType } from "../../../../types";
import Avatars from "./Avatars";
import Post from "./Post";
import Users from "./Users";

function Notification({ notification }: { notification: NotificationType }) {
  const {
    users,
    createdAt,
    type,
    comment,
    media,
    postId,
    commentId,
    isFollowed,
  } = notification;

  return (
    <li className="grid grid-cols-[58px,1fr,58px] items-center py-2">
      <Avatars users={users} />
      <Users
        users={users}
        createdAt={createdAt}
        type={type}
        comment={comment}
        isFollowed={isFollowed}
      />
      {type !== "followNotification" && (
        <Post media={media} postId={postId} commentId={commentId} />
      )}
    </li>
  );
}
export default Notification;
