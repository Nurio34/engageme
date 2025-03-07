import { useEffect } from "react";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";
import { useCreateModalContext } from "../../Context";
import CropContainer from "./CropContainer";
import EditContainer from "./EditContainer";

function Gallery() {
  const {
    CanvasContainerRef,
    files,
    setCanvasContainerSize,
    setIsListModalOpen,
    step,
  } = useCreateModalContext();

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

    setIsListModalOpen(false);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
