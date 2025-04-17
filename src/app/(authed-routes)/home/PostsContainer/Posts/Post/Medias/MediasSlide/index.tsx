import { PrismaMediaType } from "../../../../../../../../../prisma/types/post";
import ImageMedia from "../ImageMedia";
import VideoMedia from "../VideoMedia";
import { Dispatch, SetStateAction } from "react";
import { useSlide } from "./_hooks/useSlide";

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
  const { pointer, setPointer } = useSlide(
    currentIndex,
    medias,
    mediasContainerWidth,
    setCurrentIndex
  );
  const { start_x, end_x, isDragging } = pointer;

  return (
    <div
      className={`flex
        ${isDragging ? "" : "transition-transform"}  
      `}
      style={{
        transform: isDragging
          ? `translateX(${
              currentIndex * mediasContainerWidth * -1 + (end_x - start_x)
            }px)`
          : `translateX(${currentIndex * mediasContainerWidth * -1}px)`,
      }}
      onTouchStart={(e) => {
        if (medias.length === 1) return;
        const { clientX } = e.touches[0];
        setPointer((prev) => ({
          ...prev,
          start_x: clientX,
          isDragging: true,
          end_x: clientX,
        }));
      }}
      onTouchMove={(e) => {
        if (medias.length === 1) return;
        const { clientX } = e.touches[0];
        setPointer((prev) => ({ ...prev, end_x: clientX }));
      }}
      onTouchEnd={() => {
        if (medias.length === 1) return;

        setPointer((prev) => ({
          ...prev,
          isDragging: false,
        }));
      }}
    >
      {medias.map((media, ind) => {
        const { type } = media;

        return type === "image" ? (
          <ImageMedia key={media.id} index={index} media={media} />
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
