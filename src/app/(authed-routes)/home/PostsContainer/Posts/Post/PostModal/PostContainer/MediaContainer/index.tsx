import { useEffect, useRef, useState } from "react";
import {
  PrismaMediaType,
  PrismaPostType,
} from "../../../../../../../../../../prisma/types/post";
import ImageMedia from "./ImageMedia";
import VideoMedia from "./VideoMedia";
import MediaSlider from "./MediaSlider";
import SlideNext from "./SlideButtons/SlideNext";
import SlidePrevious from "./SlideButtons/SlidePrevious";

function MediaContainer({ medias }: { medias: PrismaMediaType[] }) {
  const MediaContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleContainerHeight = () => {
      if (MediaContainerRef.current) {
        setContainerHeight(
          MediaContainerRef.current.getBoundingClientRect().height
        );
      }
    };

    handleContainerHeight();

    window.addEventListener("resize", handleContainerHeight);

    return () => window.removeEventListener("resize", handleContainerHeight);
  }, []);

  return (
    <div
      ref={MediaContainerRef}
      className="relative  overflow-hidden transition-all duration-500"
      style={{ width: containerWidth }}
    >
      <MediaSlider
        medias={medias}
        containerHeight={containerHeight}
        setContainerWidth={setContainerWidth}
        currentIndex={currentIndex}
        containerWidth={containerWidth}
      />
      <SlideNext setCurrentIndex={setCurrentIndex} medias={medias} />
      <SlidePrevious setCurrentIndex={setCurrentIndex} medias={medias} />
    </div>
  );
}
export default MediaContainer;
