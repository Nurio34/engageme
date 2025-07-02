import { fancyTime } from "@/utils/fancyTime";
import Link from "next/link";

function CreatedAt({ updatedAt, postId }: { updatedAt: Date; postId: string }) {
  return (
    <Link
      href={`post/${postId}`}
      className="text-base-content/60 text-sm"
      prefetch
    >
      {fancyTime(updatedAt).short}
    </Link>
  );
}
export default CreatedAt;
