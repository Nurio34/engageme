import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";
import { useCreateModalContext } from "../../Context";
import SliceIndicator from "./SliceIndicator";

function Gallery() {
  const { CanvasContainerRef, files, setCanvasContainerSize } =
    useCreateModalContext();

  //! *** set CanvasContainer size ***
  useEffect(() => {
    const handleResize = () => {
      if (CanvasContainerRef.current) {
        const width = CanvasContainerRef.current.getBoundingClientRect().width;
        const height =
          CanvasContainerRef.current.getBoundingClientRect().height;
        setCanvasContainerSize({ width, height });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //! ***********************************
  console.log(files);
  return (
    <div
      ref={CanvasContainerRef}
      className="relative w-full h-full bg-base-100"
    >
      {files.urls?.map((url, index) => (
        <Canvas key={index} url={url} index={index} />
      ))}
      <SliceIndicator />
      <PreviousButton />
      <NextButton />
    </div>
  );
}
export default Gallery;
