import { fancyTime } from "@/utils/fancyTime";
import { getUsers } from "../utils/getUsers";
import Link from "next/link";
import { User } from "../../../../../../types";

function ReplyNotification({
  users,
  createdAt,
  comment,
}: {
  users: User[];
  createdAt: Date;
  comment: string | undefined;
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
          and {users.length - 2} others replied to your comment :{" "}
          <span className="text-xs break-all">&quot;{comment}&quot;</span>
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
          replied to your comment :{" "}
          <span className="text-xs break-all">&quot;{comment}&quot;</span>
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
          replied to your comment :{" "}
          <span className="text-xs break-all">&quot;{comment}&quot;</span>
        </span>
      ) : (
        <span>
          <Link className="font-bold" key={last.id} href={`/${last.name}`}>
            {last.name}
          </Link>{" "}
          replied to your comment :{" "}
          <span className="text-xs break-all">&quot;{comment}&quot;</span>
        </span>
      )}
      <span className="text-base-content/50">
        {" "}
        {fancyTime(createdAt).short}
      </span>
    </>
  );
}
export default ReplyNotification;
