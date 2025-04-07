"use client";

import { PrismaMediaType } from "@/../prisma/types/post";
import { useEffect, useRef, useState } from "react";

function VideoMedia({ media }: { media: PrismaMediaType }) {
  const { url, poster, transformation } = media;
  const { width, height, x, y } = transformation!;
  const aspectRatio = +width / +height;

  const ContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });
  const updatedY = +y / (+width / containerSize.width);
  const updatedX = +x / (+height / containerSize.height);

  useEffect(() => {
    if (ContainerRef.current) {
      setContainerSize({
        width: ContainerRef.current.getBoundingClientRect().width,
        height: ContainerRef.current.getBoundingClientRect().height,
      });
    }
  }, []);

  return (
    <div
      ref={ContainerRef}
      className="relative w-full max-h-[585px] overflow-hidden bg-red-50"
      style={{ aspectRatio }}
    >
      <video
        src={url}
        className="PostVideo w-full h-full"
        style={
          {
            objectFit: "cover",
            objectPosition: `-${updatedX}px -${updatedY}px`,
          } as React.CSSProperties
        }
        controls
        poster={poster?.url || ""}
      ></video>
    </div>
  );
}
export default VideoMedia;
