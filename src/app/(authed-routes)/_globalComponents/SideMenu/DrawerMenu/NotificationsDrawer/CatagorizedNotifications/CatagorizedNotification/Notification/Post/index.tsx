import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { useState } from "react";
import { MediaInterface } from "../../../../../types";

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

  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={commentId ? `/post/${postId}?c=${commentId}` : `/post/${postId}`}
      className=" justify-self-end rounded-lg overflow-hidden"
      onClick={() => dispatch(setCurrentMenu("post"))}
      onMouseEnter={() => setIsHovered(true)}
      prefetch={isHovered}
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
