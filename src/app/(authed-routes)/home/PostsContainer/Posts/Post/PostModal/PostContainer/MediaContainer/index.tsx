import { useEffect, useRef, useState } from "react";
import { PrismaMediaType } from "../../../../../../../../../../prisma/types/post";
import MediaSlider from "./MediaSlider";
import SlideNext from "./SlideButtons/SlideNext";
import SlidePrevious from "./SlideButtons/SlidePrevious";
import { useAppSelector } from "@/store/hooks";

function MediaContainer({ medias }: { medias: PrismaMediaType[] }) {
  const { device } = useAppSelector((s) => s.modals);
  const isDesktop = device.type === "desktop";

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
      className={`relative overflow-hidden transition-all duration-500`}
      style={{
        width: isDesktop ? containerWidth : "100%",
        height: isDesktop ? undefined : "100%",
        maxWidth: isDesktop ? containerHeight : undefined,
      }}
    >
      <MediaSlider
        medias={medias}
        containerHeight={containerHeight}
        setContainerWidth={setContainerWidth}
        currentIndex={currentIndex}
      />
      <SlideNext setCurrentIndex={setCurrentIndex} medias={medias} />
      <SlidePrevious setCurrentIndex={setCurrentIndex} medias={medias} />
    </div>
  );
}
export default MediaContainer;
