import Image from "next/image";
import { PrismaMediaType } from "../../../../../../../../../../../prisma/types/post";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/store/hooks";

function ImageMedia({
  media,
  index,
  containerHeight,
  setContainerWidth,
  currentIndex,
  setSlideArray,
}: {
  media: PrismaMediaType;
  index: number;
  containerHeight: number;
  setContainerWidth: Dispatch<SetStateAction<number>>;
  currentIndex: number;
  setSlideArray: Dispatch<SetStateAction<number[]>>;
}) {
  const { url, altText, width, height } = media;
  const aspectRatio = width! / height!;
  const updatedWidth = Math.min(
    containerHeight * aspectRatio,
    window.innerWidth - 420
  );

  const { device } = useAppSelector((s) => s.modals);
  const isDesktop = device.type === "desktop";

  const FigureRef = useRef<HTMLElement | null>(null);
  const [figureWidth, setFigureWidth] = useState(0);

  useEffect(() => {
    if (currentIndex === index) {
      setContainerWidth(updatedWidth);
    }
  }, [setContainerWidth, index, currentIndex, updatedWidth]);

  useEffect(() => {
    if (figureWidth === 0) return;
    if (index === 0) setSlideArray([]);

    setSlideArray((prev) => [...prev, figureWidth]);
  }, [setSlideArray, index, figureWidth]);

  useEffect(() => {
    if (FigureRef.current)
      setFigureWidth(FigureRef.current.getBoundingClientRect().width);
  }, [updatedWidth, device, currentIndex]);

  return (
    <figure
      ref={FigureRef}
      className="relative"
      style={{
        minWidth: isDesktop ? updatedWidth : "100%",
        height: containerHeight,
      }}
    >
      <Image
        src={url}
        alt={altText || "post image"}
        fill
        sizes="(max-width=1024) 100vw, 50vw"
        className={`${isDesktop ? "" : "object-cover"}`}
      />
    </figure>
  );
}
export default ImageMedia;
