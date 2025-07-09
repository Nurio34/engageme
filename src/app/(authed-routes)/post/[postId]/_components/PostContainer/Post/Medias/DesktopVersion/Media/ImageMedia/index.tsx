import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePostContext } from "@/app/(authed-routes)/post/[postId]/_components/PostContainer/Context";
import { PrismaMediaType } from "../../../../../../../../../../../../prisma/types/post";

function ImageMedia({
  media,
  index,
}: {
  media: PrismaMediaType;
  index: number;
}) {
  const { width, height, url, altText } = media;
  const aspectRatio = width! / height!;

  const { containerWidth, setContainerWidth } = usePostContext();

  const LiRef = useRef<HTMLLIElement | null>(null);
  const [liSize, setLiSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!LiRef.current) return;

    setLiSize({
      w: LiRef.current.getBoundingClientRect().width,
      h: LiRef.current.getBoundingClientRect().height,
    });
  }, []);

  useEffect(() => {
    if (!containerWidth && liSize.w > 0) setContainerWidth(liSize.w);
  }, [liSize, containerWidth]);

  return (
    <li ref={LiRef} className="h-full">
      <figure className="relative h-full" style={{ aspectRatio }}>
        <Image
          src={url}
          fill
          alt={altText || "image"}
          sizes={`(max-width: 768px) 100vw ${liSize.w}px`}
          priority={index === 0}
        />
      </figure>
    </li>
  );
}
export default ImageMedia;
