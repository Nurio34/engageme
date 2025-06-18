import { useEffect, useRef, useState } from "react";
import { PrismaMediaType } from "../../../../../../../../../../prisma/types/post";
import Media from "./Media";
import SlideIndicator from "@/app/(authed-routes)/home/PostsContainer/Posts/Post/Medias/SlideButtons/SlideIndicator";
import { usePostContext } from "@/app/(authed-routes)/post/[postId]/Context";

function MobileVersion({ medias }: { medias: PrismaMediaType[] }) {
  const { mediaIndex, setMediaIndex } = usePostContext();

  const DivRef = useRef<HTMLDivElement | null>(null);
  const [divWidth, setDivWidth] = useState(0);

  const [touch, setTouch] = useState({
    isStarted: false,
    startX: 0,
    endX: 0,
    startY: 0,
    endY: 0,
  });
  const { isStarted, startX, endX, startY, endY } = touch;

  useEffect(() => {
    const handleDivWidth = () => {
      if (DivRef.current)
        setDivWidth(DivRef.current.getBoundingClientRect().width);
    };

    handleDivWidth();

    window.addEventListener("resize", handleDivWidth);

    return () => window.removeEventListener("resize", handleDivWidth);
  }, []);

  useEffect(() => {
    if (isStarted || startX - endX === 0 || startY - endY > 50) return;
    if (startX > endX && mediaIndex < medias.length - 1)
      setMediaIndex((prev) => prev + 1);
    if (startX < endX && mediaIndex > 0) setMediaIndex((prev) => prev - 1);
  }, [isStarted]);

  return (
    <div ref={DivRef} className="w-screen relative">
      <ul
        className="w-full flex overflow-auto"
        onTouchStart={(e) => {
          const touch = e.touches[0];
          const x = touch.clientX;
          const y = touch.clientY;
          setTouch({ isStarted: true, startX: x, endX: x, startY: y, endY: y });
        }}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          const x = touch.clientX;
          const y = touch.clientY;
          setTouch((prev) => ({ ...prev, endX: x, endY: y }));
        }}
        onTouchEnd={() => {
          setTouch((prev) => ({ ...prev, isStarted: false }));
        }}
      >
        {medias.map((media, index) => (
          <Media
            key={media.id}
            index={index}
            media={media}
            divWidth={divWidth}
          />
        ))}
      </ul>
      <SlideIndicator medias={medias} currentIndex={mediaIndex} />
    </div>
  );
}
export default MobileVersion;
