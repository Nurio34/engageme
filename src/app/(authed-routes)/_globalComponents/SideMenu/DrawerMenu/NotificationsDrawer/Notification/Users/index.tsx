import Link from "next/link";
import { User } from "../..";
import { fancyTime } from "@/utils/fancyTime";

function Users({ users, createdAt }: { users: User[]; createdAt: Date }) {
  const last = { name: users[0].name, id: users[0].userId };
  const lastSecond = { name: users[1]?.name, id: users[1]?.userId };
  const lastThird = { name: users[2]?.name, id: users[2]?.userId };
  const isMoreThanThree = users.length > 3;

  return (
    <div className="text-sm">
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
    </div>
  );
}
export default Users;
