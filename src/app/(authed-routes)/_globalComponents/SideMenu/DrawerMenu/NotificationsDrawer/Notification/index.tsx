import { NotificationType } from "..";
import Users from "./Users";
import Avatars from "./Avatars";
import Post from "./Post";

function Notification({ notification }: { notification: NotificationType }) {
  const { postId, users, post, createdAt, type, media } = notification;

  return (
    <li className="grid grid-cols-[58px,1fr,58px] items-center py-2 px-6">
      <Avatars users={users} />
      <Users users={users} createdAt={createdAt} />
      <Post media={media} postId={postId} />
    </li>
  );
}
export default Notification;
