import Link from "next/link";
import { getUsers } from "../utils/getUsers";
import { fancyTime } from "@/utils/fancyTime";
import { User } from "../../../../../../types";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { setCurrentMenu } from "@/store/slices/sidemenu";

function PostCommentNotification({
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
            className="font-bold"
            key={lastSecond.id}
            href={`/${lastSecond.name}`}
            onClick={() => dispatch(setCurrentMenu(undefined))}
            onMouseEnter={() => setIsHovered(true)}
            prefetch={isHovered}
          >
            {lastSecond.name}
          </Link>{" "}
          and {users.length - 2} others commented :{" "}
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
            className="font-bold"
            key={lastSecond.id}
            href={`/${lastSecond.name}`}
            onClick={() => dispatch(setCurrentMenu(undefined))}
            onMouseEnter={() => setIsHovered(true)}
            prefetch={isHovered}
          >
            {lastSecond.name}
          </Link>{" "}
          and{" "}
          <Link
            className="font-bold"
            key={lastThird.id}
            href={`/${lastThird.name}`}
            onClick={() => dispatch(setCurrentMenu(undefined))}
            onMouseEnter={() => setIsHovered(true)}
            prefetch={isHovered}
          >
            {lastThird.name}
          </Link>{" "}
          commented :{" "}
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
            className="font-bold"
            key={lastSecond.id}
            href={`/${lastSecond.name}`}
            onClick={() => dispatch(setCurrentMenu(undefined))}
            onMouseEnter={() => setIsHovered(true)}
            prefetch={isHovered}
          >
            {lastSecond.name}
          </Link>{" "}
          commented :{" "}
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
          commented :{" "}
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
export default PostCommentNotification;
