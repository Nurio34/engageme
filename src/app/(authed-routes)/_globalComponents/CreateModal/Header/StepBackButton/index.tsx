import { FaLongArrowAltLeft } from "react-icons/fa";
import { useCreateModalContext } from "../../Context";

function StepBackButton() {
  const { goPrevStep } = useCreateModalContext();

  return (
    <button type="button" onClick={goPrevStep}>
      <FaLongArrowAltLeft size={24} />
    </button>
  );
}
export default StepBackButton;
