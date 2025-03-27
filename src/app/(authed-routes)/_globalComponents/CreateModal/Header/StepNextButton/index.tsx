import Loading from "@/app/_globalComponents/LoadingComponents/Loading";
import { useCreateModalContext } from "../../Context";

function StepNextButton() {
  const { goNextStep, cloudinaryMedias, step } = useCreateModalContext();

  const { isLoading } = cloudinaryMedias;

  if (step.step === "sharing") return;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <button
          type="button"
          className="font-semibold text-info text-sm"
          onClick={goNextStep}
        >
          {step.step === "post" ? "Share" : "Next"}
        </button>
      )}
    </>
  );
}
export default StepNextButton;
