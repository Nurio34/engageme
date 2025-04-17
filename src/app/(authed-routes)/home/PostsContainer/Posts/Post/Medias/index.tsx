"use client";

import { PrismaPostType } from "../../../../../../../../prisma/types/post";
import MediasSlide from "./MediasSlide";
import SlidePrevious from "./SlideButtons/SlidePrevious";
import SlideNext from "./SlideButtons/SlideNext";
import SlideIndicator from "./SlideButtons/SlideIndicator";
import { useMedias } from "./_hooks/useMedias";
import { useAppSelector } from "@/store/hooks";

function Medias({ index, post }: { index: number; post: PrismaPostType }) {
  const { medias } = post;

  const { device } = useAppSelector((s) => s.modals);
  const { type } = device;
  const isDesktop = type === "desktop";

  const {
    MediasContainerRef,
    currentIndex,
    mediasContainerWidth,
    setCurrentIndex,
  } = useMedias();

  return (
    <div
      ref={MediasContainerRef}
      className="relative mt-2 overflow-hidden shadow-md md:rounded-lg"
      onContextMenu={(e) => e.preventDefault()}
    >
      <MediasSlide
        index={index}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        mediasContainerWidth={mediasContainerWidth}
        medias={medias}
      />
      {isDesktop && (
        <SlidePrevious setCurrentIndex={setCurrentIndex} medias={medias} />
      )}
      {isDesktop && (
        <SlideNext setCurrentIndex={setCurrentIndex} medias={medias} />
      )}
      <SlideIndicator medias={medias} currentIndex={currentIndex} />
    </div>
  );
}
export default Medias;
