import Image from "next/image";
import { PrismaMediaType } from "../../../../../../../../../../../../prisma/types/post";
import { useEffect, useRef } from "react";
import { usePostContext } from "@/app/(authed-routes)/post/[postId]/_components/PostContainer/Context";

function ImageMedia({
  index,
  media,
  divWidth,
}: {
  index: number;
  media: PrismaMediaType;
  divWidth: number;
}) {
  const { altText, width, height, url } = media;

  const aspectRatio = width! / height!;
  const newHeight = divWidth / aspectRatio;

  const { mediaIndex } = usePostContext();

  const LiRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!LiRef.current) return;

    if (index === mediaIndex)
      LiRef.current.scrollIntoView({ behavior: "smooth" });
  }, [mediaIndex]);

  return (
    <li ref={LiRef} style={{ minWidth: divWidth }}>
      <figure className="relative w-full" style={{ height: newHeight }}>
        <Image src={url} alt={altText || "image"} fill priority={index === 0} />
      </figure>
    </li>
  );
}
export default ImageMedia;
