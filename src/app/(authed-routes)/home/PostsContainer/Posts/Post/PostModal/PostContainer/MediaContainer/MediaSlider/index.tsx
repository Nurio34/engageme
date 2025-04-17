import { Dispatch, SetStateAction } from "react";
import { PrismaMediaType } from "../../../../../../../../../../../prisma/types/post";
import ImageMedia from "../ImageMedia";
import VideoMedia from "../VideoMedia";
import { useSlide } from "./_hooks/useSlide";

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
  const { isDragging, slide, pointer, setPointer, setSlideArray } = useSlide(
    currentIndex,
    medias,
    containerWidth,
    setCurrentIndex
  );
  const { start_x, end_x } = pointer;
  return (
    <div
      className={`flex
        ${isDragging ? "" : "transition-transform duration-700"}  
      `}
      style={{
        transform: isDragging
          ? `translateX(-${slide - (end_x - start_x)}px)`
          : `translateX(-${slide}px)`,
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
              setSlideArray={setSlideArray}
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
              setSlideArray={setSlideArray}
            />
          );
      })}
    </div>
  );
}
export default MediaSlider;
