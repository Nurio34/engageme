import { usePostContext } from "@/app/(authed-routes)/post/[postId]/Context";
import { PrismaMediaType } from "../../../../../../../../../../../../prisma/types/post";
import { useEffect, useRef } from "react";

function VideoMedia({
  index,
  media,
  divWidth,
}: {
  index: number;
  media: PrismaMediaType;
  divWidth: number;
}) {
  const { poster, url, transformation } = media;
  const { width, height, x, y } = transformation!;
  const aspectRatio = +width / +height;
  const newHeight = divWidth / aspectRatio;

  const adjustmentParameter = +width / divWidth;
  const newX = Math.abs(+x) / adjustmentParameter;
  const newY = Math.abs(+y) / adjustmentParameter;

  const { mediaIndex } = usePostContext();

  const LiRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!LiRef.current) return;

    if (index === mediaIndex)
      LiRef.current.scrollIntoView({ behavior: "smooth" });
  }, [mediaIndex]);

  return (
    <li ref={LiRef} style={{ minWidth: divWidth, height: newHeight }}>
      <video
        src={url}
        poster={poster?.url || undefined}
        className={`object-cover
            ${Math.abs(+y) >= 0 ? "w-full" : ""}
            ${Math.abs(+x) >= 0 ? "h-full" : ""}
        `}
        style={{
          objectPosition: `${newX * -1}px ${newY * -1}px`,
        }}
      />
    </li>
  );
}
export default VideoMedia;
