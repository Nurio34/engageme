import { PrismaMediaType } from "../../../../../../../../../prisma/types/post";
import ImageMedia from "../ImageMedia";
import VideoMedia from "../VideoMedia";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function MediasSlide({
  index,
  currentIndex,
  setCurrentIndex,
  mediasContainerWidth,
  medias,
}: {
  index: number;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  mediasContainerWidth: number;
  medias: PrismaMediaType[];
}) {
  const [touchEvent, setTouchEvent] = useState({
    isDragging: false,
    startX: 0,
    endX: 0,
  });
  const { isDragging, startX, endX } = touchEvent;
  useEffect(() => {
    if (isDragging || Math.abs(endX - startX) < 25) return;

    if (endX > startX)
      setCurrentIndex((prev) => {
        if (prev === 0) return prev;
        return prev - 1;
      });
    else
      setCurrentIndex((prev) => {
        if (prev === medias.length - 1) return prev;
        return prev + 1;
      });
  }, [isDragging]);

  return (
    <div
      className={`flex transition-transform  duration-500`}
      style={{
        transform: `translateX(${currentIndex * mediasContainerWidth * -1}px)`,
      }}
      onTouchStart={(e) => {
        const x = e.touches[0].clientX;
        setTouchEvent({ isDragging: true, startX: x, endX: x });
      }}
      onTouchMove={(e) => {
        const x = e.touches[0].clientX;
        setTouchEvent((prev) => ({ ...prev, endX: x }));
      }}
      onTouchEnd={() =>
        setTouchEvent((prev) => ({ ...prev, isDragging: false }))
      }
    >
      {medias.map((media, ind) => {
        const { type } = media;

        return type === "image" ? (
          <ImageMedia key={media.id} index={index} ind={ind} media={media} />
        ) : (
          <VideoMedia
            key={media.id}
            media={media}
            index={ind}
            currentIndex={currentIndex}
          />
        );
      })}
    </div>
  );
}
export default MediasSlide;
