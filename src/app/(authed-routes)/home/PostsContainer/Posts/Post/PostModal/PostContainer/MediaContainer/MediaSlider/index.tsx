import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PrismaMediaType } from "../../../../../../../../../../../prisma/types/post";
import ImageMedia from "../ImageMedia";
import VideoMedia from "../VideoMedia";

function MediaSlider({
  medias,
  containerHeight,
  setContainerWidth,
  currentIndex,
  containerWidth,
}: {
  medias: PrismaMediaType[];
  containerHeight: number;
  setContainerWidth: Dispatch<SetStateAction<number>>;
  currentIndex: number;
  containerWidth: number;
}) {
  const [slideArray, setSlideArray] = useState<number[]>([]);
  const [slide, setSlide] = useState(0);
  console.log({ slideArray, slide });

  useEffect(() => {
    const slideAmount = slideArray.reduce((sum, amount, ind) => {
      if (currentIndex > ind) sum = sum + amount;
      return sum;
    }, 0);
    setSlide(slideAmount);
  }, [currentIndex]);

  return (
    <div
      className="flex transition-transform duration-500"
      style={{
        transform: `translateX(-${slide}px)`,
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
