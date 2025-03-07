import { IoIosArrowForward } from "react-icons/io";
import { useCreateModalContext } from "../../../Context";

function NextButton() {
  const {
    setCurrentIndex,
    files,
    setIsAllModalsClosed,
    baseCanvasContainerWidth,
  } = useCreateModalContext();
  const totalMedia = files.files!.length;

  const goNextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % totalMedia);
    setIsAllModalsClosed(true);
  };

  return (
    <button
      type="button"
      className="absolute top-1/2
        btn btn-circle btn-neutral 
      "
      style={{
        left:
          baseCanvasContainerWidth === 0
            ? undefined
            : baseCanvasContainerWidth - 4 - 48,
        right: baseCanvasContainerWidth === 0 ? 4 : undefined,
      }}
      onClick={goNextMedia}
    >
      <IoIosArrowForward size={32} />
    </button>
  );
}
export default NextButton;
