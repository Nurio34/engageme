import { useCreateModalContext } from "../../Context";

function StepNextButton() {
  const { goNextStep } = useCreateModalContext();

  return (
    <button
      type="button"
      className="font-semibold text-info text-sm"
      onClick={goNextStep}
    >
      Next
    </button>
  );
}
export default StepNextButton;
