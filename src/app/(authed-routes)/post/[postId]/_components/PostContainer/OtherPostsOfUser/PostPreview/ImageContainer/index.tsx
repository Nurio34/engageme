import Image from "next/image";
import { PostPreviewType } from "../../../../../../../../../../prisma/types/postPreview";
import { useState } from "react";
import { HiMiniSquare2Stack } from "react-icons/hi2";
import { AiFillPicture } from "react-icons/ai";
import CountsViewLink from "../CountsViewLink";

function ImageContainer({ post }: { post: PostPreviewType }) {
  const { medias, _count, id: postId } = post;
  const { url, altText } = medias[0];
  const {
    medias: mediasCount,
    likes: likesCount,
    comments: commentsCount,
  } = _count;

  const [isHover, setIsHover] = useState(false);

  return (
    <li
      className="relative aspect-[0.75] cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <figure className="relative w-full h-full">
        <Image
          src={url}
          alt={altText || "image"}
          fill
          className="object-cover"
          sizes="(max-width: 1023px) 33vw, 308px"
        />
      </figure>
      <div className="absolute top-1 right-1">
        {mediasCount > 1 ? (
          <HiMiniSquare2Stack
            className="text-2xl text-base-100"
            style={{ transform: "rotateY(180deg) rotateX(180deg)" }}
          />
        ) : (
          <AiFillPicture className="text-2xl text-base-100" />
        )}
      </div>

      <CountsViewLink
        isHover={isHover}
        postId={postId}
        likesCount={likesCount}
        commentsCount={commentsCount}
      />
    </li>
  );
}
export default ImageContainer;
