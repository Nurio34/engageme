import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PrismaMediaType } from "../../../../../../../../../../../prisma/types/post";
import ImageMedia from "../ImageMedia";
import VideoMedia from "../VideoMedia";
import { usePostsContext } from "../../../../../Context";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPostModal } from "@/store/slices/homePage";

function MediaSlider({
  medias,
  containerHeight,
  setContainerWidth,
  currentIndex,
}: {
  medias: PrismaMediaType[];
  containerHeight: number;
  setContainerWidth: Dispatch<SetStateAction<number>>;
  currentIndex: number;
}) {
  const { device } = useAppSelector((s) => s.modals);
  const isDesktop = device.type === "desktop";
  const dispatch = useAppDispatch();

  const [slideArray, setSlideArray] = useState<number[]>([]);
  const [slide, setSlide] = useState(0);

  const { isDragging, setPointer } = usePostsContext();

  useEffect(() => {
    const slideAmount = slideArray.reduce((sum, amount, ind) => {
      if (currentIndex > ind) sum = sum + amount;
      return sum;
    }, 0);
    setSlide(slideAmount);
  }, [currentIndex, slideArray]);

  return (
    <div
      className="flex transition-transform duration-500"
      style={{
        transform: `translateX(-${slide}px)`,
      }}
      onMouseDown={(e) => {
        setPointer((prev) => ({
          ...prev,
          start_x: e.clientX,
          start_y: e.clientY,
          isDragging: true,
          end_x: e.clientX,
          end_y: e.clientY,
        }));
      }}
      onMouseMove={(e) => {
        if (isDragging)
          setPointer((prev) => ({
            ...prev,
            end_x: e.clientX,
            end_y: e.clientY,
          }));
      }}
      onMouseUp={() => {
        setPointer((prev) => ({
          ...prev,
          isDragging: false,
        }));
      }}
      onTouchStart={(e) => {
        const { clientX, clientY } = e.touches[0];
        if (isDesktop) dispatch(setPostModal({ isOpen: false, postId: "" }));
        setPointer((prev) => ({
          ...prev,
          start_x: clientX,
          start_y: clientY,
          isDragging: true,
          end_x: clientX,
          end_y: clientY,
        }));
      }}
      onTouchMove={(e) => {
        const { clientX, clientY } = e.touches[0];

        if (isDragging)
          setPointer((prev) => ({
            ...prev,
            end_x: clientX,
            end_y: clientY,
          }));
      }}
      onTouchEnd={() => {
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
