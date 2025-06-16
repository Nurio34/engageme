import Link from "next/link";

function PostError({ postId }: { postId: string }) {
  return (
    <div>
      <p>Some error occured</p>
      <Link href={`/post/${postId}`} className="btn btn-primary">
        Refresh
      </Link>
    </div>
  );
}
export default PostError;
