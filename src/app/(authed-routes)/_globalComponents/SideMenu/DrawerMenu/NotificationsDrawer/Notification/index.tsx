import Image from "next/image";
import { NotificationType } from "..";
import Link from "next/link";

function Notification({ notification }: { notification: NotificationType }) {
  const { message, avatar, post, comment, reply, postId, postCommentId } =
    notification;

  return (
    <li>
      <Link
        href={`/post/${postId}/?commentId=${postCommentId}`}
        className="grid grid-cols-[auto,1fr] bg-primary/50 rounded-lg p-1"
      >
        <figure className="relative w-8 aspect-square rounded-full overflow-hidden">
          <Image
            src={avatar || "/placeholders/avatar.webp"}
            fill
            alt="avatar"
          />
        </figure>
        <div>
          <p>{message}</p>
          <p>{post || comment || reply}</p>
        </div>
      </Link>
    </li>
  );
}
export default Notification;
