import Image from "next/image";
import Link from "next/link";
import { MediaInterface } from "../../../../types";

function Post({
  media,
  postId,
  commentId,
}: {
  media: MediaInterface;
  postId: string;
  commentId: string | undefined;
}) {
  const type = media.type;

  return (
    <Link
      href={commentId ? `/p/${postId}&c=${commentId}` : `/p/${postId}`}
      className=" justify-self-end rounded-lg overflow-hidden"
    >
      {type === "image" ? (
        <figure className="relative w-11 aspect-square">
          <Image src={media.url} alt="post" fill sizes="44px" />
        </figure>
      ) : (
        <video
          src={media.url}
          className="w-11 aspect-square overflow-hidden object-cover pointer-events-none"
        />
      )}
    </Link>
  );
}
export default Post;
