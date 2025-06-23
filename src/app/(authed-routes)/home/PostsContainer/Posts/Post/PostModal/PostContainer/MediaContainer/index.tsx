import { useEffect, useRef, useState } from "react";
import { PrismaMediaType } from "../../../../../../../../../../prisma/types/post";
import MediaSlider from "./MediaSlider";
import SlideNext from "./SlideButtons/SlideNext";
import SlidePrevious from "./SlideButtons/SlidePrevious";
import { useAppSelector } from "@/store/hooks";
import SlideIndicator from "../../../Medias/SlideButtons/SlideIndicator";

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
        minWidth: isDesktop ? containerWidth : "100%",
        height: isDesktop ? undefined : "100%",
        maxWidth: isDesktop ? containerHeight : undefined,
      }}
    >
      <MediaSlider
        medias={medias}
        containerHeight={containerHeight}
        containerWidth={containerWidth}
        setContainerWidth={setContainerWidth}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      {isDesktop && (
        <SlideNext setCurrentIndex={setCurrentIndex} medias={medias} />
      )}
      {isDesktop && (
        <SlidePrevious setCurrentIndex={setCurrentIndex} medias={medias} />
      )}
      <SlideIndicator medias={medias} currentIndex={currentIndex} />
    </div>
  );
}
export default MediaContainer;
