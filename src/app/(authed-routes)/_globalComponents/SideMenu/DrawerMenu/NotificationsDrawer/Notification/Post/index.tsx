import Image from "next/image";
import { MediaInterface } from "../..";
import Link from "next/link";

function Post({ media, postId }: { media: MediaInterface; postId: string }) {
  const type = media.type;

  return (
    <Link
      href={`/p/${postId}`}
      className=" justify-self-end rounded-lg overflow-hidden"
    >
      {type === "image" ? (
        <figure className="relative w-11 aspect-square">
          <Image src={media.url} alt="post" fill />
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
