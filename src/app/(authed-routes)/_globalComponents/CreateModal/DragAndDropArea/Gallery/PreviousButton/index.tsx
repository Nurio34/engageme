import { IoIosArrowBack } from "react-icons/io";
import { useCreateModalContext } from "../../../Context";

function PreviousButton() {
  const { setCurrentIndex, files, setIsAllModalsClosed, step } =
    useCreateModalContext();
  const totalMedia = files.files!.length;

  const goPreviousMedia = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return totalMedia - 1;
      }

      return prev - 1;
    });
    setIsAllModalsClosed(true);
  };

  if (step.step === "sharing") return;

  return (
    <button
      type="button"
      className="absolute top-1/2 left-1 z-10
        btn btn-circle btn-neutral 
      "
      onClick={goPreviousMedia}
    >
      <IoIosArrowBack size={32} color="white" />
    </button>
  );
}
export default PreviousButton;
