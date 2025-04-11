import Image from "next/image";
import { PrismaMediaType } from "../../../../../../../../../../../prisma/types/post";
import { Dispatch, SetStateAction, useEffect } from "react";

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

  const updatedWidth = containerHeight * aspectRatio;

  useEffect(() => {
    if (currentIndex === index) {
      setContainerWidth(updatedWidth);
    }
  }, [currentIndex, updatedWidth]);

  useEffect(() => {
    if (updatedWidth === 0) return;

    setSlideArray((prev) => [...prev, updatedWidth]);
  }, [updatedWidth]);

  return (
    <figure
      className="relative"
      style={{ minWidth: updatedWidth, height: containerHeight }}
    >
      <Image src={url} alt={altText || "post image"} fill />
    </figure>
  );
}
export default ImageMedia;
