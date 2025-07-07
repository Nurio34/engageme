import Link from "next/link";
import { getUsers } from "../utils/getUsers";
import { fancyTime } from "@/utils/fancyTime";
import { User } from "../../../../../../types";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { setCurrentMenu } from "@/store/slices/sidemenu";

function ReplyLikeNotification({
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
          and {users.length - 2} others liked your reply :{" "}
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
          liked your reply :{" "}
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
          liked your reply :{" "}
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
          liked your reply :{" "}
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
export default ReplyLikeNotification;
