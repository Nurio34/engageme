import Link from "next/link";
import { FaComment } from "react-icons/fa";
import { IoHeartSharp } from "react-icons/io5";

function CountsViewLink({
  isHover,
  postId,
  likesCount,
  commentsCount,
}: {
  isHover: boolean;
  postId: string;
  likesCount: number;
  commentsCount: number;
}) {
  return (
    isHover && (
      <Link
        href={`/post/${postId}`}
        prefetch
        className="absolute z-10 top-0 left-0 w-full h-full bg-base-content/80
          flex justify-center items-center
        "
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-x-[2.23vw] gap-y-2 text-base-100">
          <div className="flex items-center gap-x-2">
            <IoHeartSharp
              className="text-2xl"
              style={{ transform: `rotateY(180deg)` }}
            />
            <p className="font-bold">{likesCount}</p>
          </div>{" "}
          <div className="flex items-center gap-x-2">
            <FaComment
              className="text-xl"
              style={{ transform: `rotateY(180deg)` }}
            />
            <p className="font-bold">
              {commentsCount.toLocaleString().replace(".", ",")}
            </p>
          </div>
        </div>
      </Link>
    )
  );
}
export default CountsViewLink;
