import { Dispatch, SetStateAction } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useCreateModalContext } from "../../../Context";

function PreviousButton() {
  const { setCurrentIndex, files } = useCreateModalContext();
  const totalMedia = files.files!.length;

  const goPreviousMedia = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return totalMedia - 1;
      }

      return prev - 1;
    });
  };

  return (
    <button
      type="button"
      className="absolute top-1/2 left-1  z-10
        btn btn-ghost hover:btn-outline
      "
      onClick={goPreviousMedia}
    >
      <IoIosArrowBack size={32} color="white" />
    </button>
  );
}
export default PreviousButton;
