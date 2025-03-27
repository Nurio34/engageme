import { FaLongArrowAltLeft } from "react-icons/fa";
import { useCreateModalContext } from "../../Context";

function StepBackButton() {
  const { goPrevStep, cloudinaryMedias, step } = useCreateModalContext();
  const { isLoading } = cloudinaryMedias;

  if (step.step === "sharing") return;
  return (
    <button type="button" onClick={goPrevStep} disabled={isLoading}>
      <FaLongArrowAltLeft size={24} />
    </button>
  );
}
export default StepBackButton;
