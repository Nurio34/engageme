import { NotificationType } from "..";
import Users from "./Users";
import Avatars from "./Avatars";
import Post from "./Post";

function Notification({ notification }: { notification: NotificationType }) {
  const { postId, users, createdAt, type, media, comment, commentId } =
    notification;

  return (
    <li className="grid grid-cols-[58px,1fr,58px] items-center py-2 px-6">
      <Avatars users={users} />
      <Users
        users={users}
        createdAt={createdAt}
        type={type}
        comment={comment}
      />
      <Post media={media} postId={postId} commentId={commentId} />
    </li>
  );
}
export default Notification;
