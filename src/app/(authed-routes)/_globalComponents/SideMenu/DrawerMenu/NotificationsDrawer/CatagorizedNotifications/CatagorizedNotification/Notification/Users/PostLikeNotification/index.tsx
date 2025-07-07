import Link from "next/link";
import { fancyTime } from "@/utils/fancyTime";
import { getUsers } from "../utils/getUsers";
import { User } from "../../../../../../types";
import { useAppDispatch } from "@/store/hooks";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { useState } from "react";

function PostLikeNotification({
  users,
  createdAt,
}: {
  users: User[];
  createdAt: Date;
}) {
  const { isMoreThanThree, lastThird, lastSecond, last } = getUsers(users);

  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {isMoreThanThree ? (
        <span>
          <Link
            className="font-bold"
            key={last.id}
            href={`/${last.name}`}
            onClick={() => dispatch(setCurrentMenu(undefined))}
            onMouseEnter={() => setIsHovered(true)}
            prefetch={isHovered}
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
          and {users.length - 2} others liked your post.
        </span>
      ) : lastThird.name ? (
        <span>
          <Link
            className="font-bold"
            key={last.id}
            href={`/${last.name}`}
            onClick={() => dispatch(setCurrentMenu(undefined))}
            onMouseEnter={() => setIsHovered(true)}
            prefetch={isHovered}
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
          liked your post.
        </span>
      ) : lastSecond.name ? (
        <span>
          <Link
            className="font-bold"
            key={last.id}
            href={`/${last.name}`}
            onClick={() => dispatch(setCurrentMenu("post"))}
            onMouseEnter={() => setIsHovered(true)}
            prefetch={isHovered}
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
          liked your post.
        </span>
      ) : (
        <span>
          <Link
            className="font-bold"
            key={last.id}
            href={`/${last.name}`}
            onClick={() => dispatch(setCurrentMenu(undefined))}
            onMouseEnter={() => setIsHovered(true)}
            prefetch={isHovered}
          >
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
