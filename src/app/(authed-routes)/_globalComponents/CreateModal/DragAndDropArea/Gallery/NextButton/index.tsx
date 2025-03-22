import { IoIosArrowForward } from "react-icons/io";
import { useCreateModalContext } from "../../../Context";
import { useEffect, useState } from "react";

function NextButton() {
  const {
    setCurrentIndex,
    files,
    setIsAllModalsClosed,
    baseCanvasContainerWidth,
    canvasContainerSize,
    step,
  } = useCreateModalContext();
  const totalMedia = files.files!.length;
  const { width } = canvasContainerSize;

  const [padding, setPadding] = useState(0);

  useEffect(() => {
    if (step.step === "crop") {
      setPadding(width);
    } else {
      setPadding(baseCanvasContainerWidth);
    }
  }, [step, canvasContainerSize]);

  const goNextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % totalMedia);
    setIsAllModalsClosed(true);
  };

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
