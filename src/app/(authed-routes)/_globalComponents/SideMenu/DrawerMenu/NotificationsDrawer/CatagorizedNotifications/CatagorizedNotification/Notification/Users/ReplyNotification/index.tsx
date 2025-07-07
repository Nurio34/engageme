import { fancyTime } from "@/utils/fancyTime";
import { getUsers } from "../utils/getUsers";
import Link from "next/link";
import { User } from "../../../../../../types";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { setCurrentMenu } from "@/store/slices/sidemenu";

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

  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      {isMoreThanThree ? (
        <span>
          <Link
            onClick={() => dispatch(setCurrentMenu(undefined))}
            onMouseEnter={() => setIsHovered(true)}
            prefetch={isHovered}
            className="font-bold"
            key={last.id}
            href={`/${last.name}`}
          >
            {last.name}
          </Link>
          ,{" "}
          <Link
            onClick={() => dispatch(setCurrentMenu(undefined))}
            onMouseEnter={() => setIsHovered(true)}
            prefetch={isHovered}
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
          <Link
            onClick={() => dispatch(setCurrentMenu(undefined))}
            onMouseEnter={() => setIsHovered(true)}
            prefetch={isHovered}
            className="font-bold"
            key={last.id}
            href={`/${last.name}`}
          >
            {last.name}
          </Link>
          ,{" "}
          <Link
            onClick={() => dispatch(setCurrentMenu(undefined))}
            onMouseEnter={() => setIsHovered(true)}
            prefetch={isHovered}
            className="font-bold"
            key={lastSecond.id}
            href={`/${lastSecond.name}`}
          >
            {lastSecond.name}
          </Link>{" "}
          and{" "}
          <Link
            onClick={() => dispatch(setCurrentMenu(undefined))}
            onMouseEnter={() => setIsHovered(true)}
            prefetch={isHovered}
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
          <Link
            onClick={() => dispatch(setCurrentMenu(undefined))}
            onMouseEnter={() => setIsHovered(true)}
            prefetch={isHovered}
            className="font-bold"
            key={last.id}
            href={`/${last.name}`}
          >
            {last.name}
          </Link>{" "}
          and{" "}
          <Link
            onClick={() => dispatch(setCurrentMenu(undefined))}
            onMouseEnter={() => setIsHovered(true)}
            prefetch={isHovered}
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
          <Link
            onClick={() => dispatch(setCurrentMenu(undefined))}
            onMouseEnter={() => setIsHovered(true)}
            prefetch={isHovered}
            className="font-bold"
            key={last.id}
            href={`/${last.name}`}
          >
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
