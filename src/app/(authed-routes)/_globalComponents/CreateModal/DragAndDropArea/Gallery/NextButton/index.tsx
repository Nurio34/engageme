import { IoIosArrowForward } from "react-icons/io";
import { useCreateModalContext } from "../../../Context";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

function NextButton() {
  const { isEditing } = useAppSelector((s) => s.postEdit);
  const {
    setCurrentIndex,
    files,
    setIsAllModalsClosed,
    baseCanvasContainerWidth,
    canvasContainerSize,
    step,
    editedMedias,
  } = useCreateModalContext();
  const totalMedia = isEditing ? editedMedias.length : files.files!.length;
  const { width } = canvasContainerSize;

  const [padding, setPadding] = useState(0);

  useEffect(() => {
    const handlePadding = () => {
      if (step.step === "crop") {
        setPadding(width);
      } else {
        setPadding(
          baseCanvasContainerWidth > 0
            ? baseCanvasContainerWidth
            : innerWidth <= 1023
            ? innerWidth
            : 734
        );
      }
    };

    handlePadding();

    window.addEventListener("resize", handlePadding);

    return () => window.removeEventListener("resize", handlePadding);
  }, [step, canvasContainerSize]);

  const goNextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % totalMedia);
    setIsAllModalsClosed(true);
  };

  if (step.step === "sharing") return;

  return (
    <button
      type="button"
      className="absolute top-1/2 z-10
        btn btn-circle btn-neutral 
      "
      style={{
        left: padding === 0 ? undefined : padding - 4 - 48,
        right: padding === 0 ? 4 : undefined,
      }}
      onClick={goNextMedia}
    >
      <IoIosArrowForward size={32} />
    </button>
  );
}
export default NextButton;
