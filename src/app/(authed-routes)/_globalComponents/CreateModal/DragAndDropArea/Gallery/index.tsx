import { useEffect, useRef } from "react";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";
import { useCreateModalContext } from "../../Context";
import CropContainer from "./CropContainer";
import EditContainer from "./EditContainer";

function Gallery() {
  const { CanvasContainerRef, setCanvasContainerSize, step } =
    useCreateModalContext();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  //! *** set CanvasContainer size ***
  useEffect(() => {
    const handleResize = () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (CanvasContainerRef.current && step.step === "crop") {
          const width =
            CanvasContainerRef.current.getBoundingClientRect().width;
          const height =
            CanvasContainerRef.current.getBoundingClientRect().height;
          setCanvasContainerSize({ width, height });
        }
      }, 1500);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [step]);
  //! ***********************************

  return (
    <div
      ref={CanvasContainerRef}
      className="relative w-full h-full bg-base-100"
    >
      <CropContainer />
      <EditContainer />
      <PreviousButton />
      <NextButton />
    </div>
  );
}
export default Gallery;
