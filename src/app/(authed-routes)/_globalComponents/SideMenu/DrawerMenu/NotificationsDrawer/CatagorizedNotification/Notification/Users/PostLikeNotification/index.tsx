import Link from "next/link";
import { fancyTime } from "@/utils/fancyTime";
import { getUsers } from "../utils/getUsers";
import { User } from "../../../../../types";

function PostLikeNotification({
  users,
  createdAt,
}: {
  users: User[];
  createdAt: Date;
}) {
  const { isMoreThanThree, lastThird, lastSecond, last } = getUsers(users);

  return (
    <>
      {isMoreThanThree ? (
        <span>
          <Link className="font-bold" key={last.id} href={`/${last.name}`}>
            {last.name}
          </Link>
          ,{" "}
          <Link
            className="font-bold"
            key={lastSecond.id}
            href={`/${lastSecond.name}`}
          >
            {lastSecond.name}
          </Link>{" "}
          and {users.length - 2} others liked your post.
        </span>
      ) : lastThird.name ? (
        <span>
          <Link className="font-bold" key={last.id} href={`/${last.name}`}>
            {last.name}
          </Link>
          ,{" "}
          <Link
            className="font-bold"
            key={lastSecond.id}
            href={`/${lastSecond.name}`}
          >
            {lastSecond.name}
          </Link>{" "}
          and{" "}
          <Link
            className="font-bold"
            key={lastThird.id}
            href={`/${lastThird.name}`}
          >
            {lastThird.name}
          </Link>{" "}
          liked your post.
        </span>
      ) : lastSecond.name ? (
        <span>
          <Link className="font-bold" key={last.id} href={`/${last.name}`}>
            {last.name}
          </Link>{" "}
          and{" "}
          <Link
            className="font-bold"
            key={lastSecond.id}
            href={`/${lastSecond.name}`}
          >
            {lastSecond.name}
          </Link>{" "}
          liked your post.
        </span>
      ) : (
        <span>
          <Link className="font-bold" key={last.id} href={`/${last.name}`}>
            {last.name}
          </Link>{" "}
          liked your post.
        </span>
      )}
      <span className="text-base-content/50">
        {" "}
        {fancyTime(createdAt).short}
      </span>
    </>
  );
}

export default PostLikeNotification;
