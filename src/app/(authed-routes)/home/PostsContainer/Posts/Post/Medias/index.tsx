"use client";

import { PrismaPostType } from "../../../../../../../../prisma/types/post";
import { useEffect, useRef, useState } from "react";
import MediasSlide from "./MediasSlide";
import SlidePrevious from "./SlideButtons/SlidePrevious";
import SlideNext from "./SlideButtons/SlideNext";
import SlideIndicator from "./SlideButtons/SlideIndicator";

function Medias({ index, post }: { index: number; post: PrismaPostType }) {
  const { medias } = post;

  const [currentIndex, setCurrentIndex] = useState(0);

  const MediasContainerRef = useRef<HTMLDivElement | null>(null);
  const [mediasContainerWidth, setMediasContainerWidth] = useState(0);

  useEffect(() => {
    const handleWidth = () => {
      if (MediasContainerRef.current) {
        setMediasContainerWidth(
          MediasContainerRef.current.getBoundingClientRect().width
        );
      }
    };
    handleWidth();

    window.addEventListener("resize", handleWidth);

    return () => window.removeEventListener("resize", handleWidth);
  }, []);

  return (
    <div
      ref={MediasContainerRef}
      className="relative mt-2 overflow-hidden shadow-md md:rounded-lg"
      onContextMenu={(e) => e.preventDefault()}
    >
      <MediasSlide
        index={index}
        currentIndex={currentIndex}
        mediasContainerWidth={mediasContainerWidth}
        medias={medias}
      />
      <SlidePrevious setCurrentIndex={setCurrentIndex} medias={medias} />
      <SlideNext setCurrentIndex={setCurrentIndex} medias={medias} />
      <SlideIndicator medias={medias} currentIndex={currentIndex} />
    </div>
  );
}
export default Medias;
