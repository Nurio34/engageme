import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PrismaMediaType } from "../../../../../../../../../../../prisma/types/post";
import ImageMedia from "../ImageMedia";
import VideoMedia from "../VideoMedia";

function MediaSlider({
  medias,
  containerHeight,
  containerWidth,
  setContainerWidth,
  currentIndex,
  setCurrentIndex,
}: {
  medias: PrismaMediaType[];
  containerWidth: number;
  containerHeight: number;
  setContainerWidth: Dispatch<SetStateAction<number>>;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
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
        transform: `translateX(${currentIndex * containerWidth * -1}px)`,
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
      {medias.map((media, index) => {
        if (media.type === "image")
          return (
            <ImageMedia
              key={media.id}
              index={index}
              media={media}
              containerHeight={containerHeight}
              setContainerWidth={setContainerWidth}
              currentIndex={currentIndex}
            />
          );
        else
          return (
            <VideoMedia
              key={media.id}
              index={index}
              media={media}
              containerHeight={containerHeight}
              setContainerWidth={setContainerWidth}
              currentIndex={currentIndex}
            />
          );
      })}
    </div>
  );
}
export default MediaSlider;
