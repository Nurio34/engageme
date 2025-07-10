import { FaLongArrowAltLeft } from "react-icons/fa";
import { useCreateModalContext } from "../../Context";
import { useAppSelector } from "@/store/hooks";

function StepBackButton() {
  const { isEditing } = useAppSelector((s) => s.postEdit);

  const { goPrevStep, cloudinaryMedias, step } = useCreateModalContext();
  const { isLoading } = cloudinaryMedias;

  if (isEditing) return <div />;
  if (step.step === "sharing") return;
  return (
    <button type="button" onClick={goPrevStep} disabled={isLoading}>
      <FaLongArrowAltLeft size={24} />
    </button>
  );
}
export default StepBackButton;
