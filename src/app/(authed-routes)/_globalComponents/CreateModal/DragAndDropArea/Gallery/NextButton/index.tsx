import { Dispatch, SetStateAction } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useCreateModalContext } from "../../../Context";

function NextButton() {
  const { setCurrentIndex, files } = useCreateModalContext();
  const totalMedia = files.files!.length;

  const goNextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % totalMedia);
  };

  return (
    <button
      type="button"
      className="absolute top-1/2 right-1  z-10
        btn btn-ghost hover:btn-outline
      "
      onClick={goNextMedia}
    >
      <IoIosArrowForward size={32} color="white" />
    </button>
  );
}
export default NextButton;
