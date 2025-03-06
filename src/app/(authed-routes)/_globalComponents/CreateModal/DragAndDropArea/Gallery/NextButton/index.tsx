import { IoIosArrowForward } from "react-icons/io";
import { useCreateModalContext } from "../../../Context";

function NextButton() {
  const { setCurrentIndex, files, setIsAllModalsClosed } =
    useCreateModalContext();
  const totalMedia = files.files!.length;

  const goNextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % totalMedia);
    setIsAllModalsClosed(true);
  };

  return (
    <button
      type="button"
      className="absolute top-1/2 right-1
        btn btn-ghost hover:btn-outline
      "
      onClick={goNextMedia}
    >
      <IoIosArrowForward size={32} color="white" />
    </button>
  );
}
export default NextButton;
