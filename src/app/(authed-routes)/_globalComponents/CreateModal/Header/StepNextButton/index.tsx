import Loading from "@/app/_globalComponents/Loading";
import { useCreateModalContext } from "../../Context";

function StepNextButton() {
  const { goNextStep, cloudinaryMedias } = useCreateModalContext();

  const { isLoading } = cloudinaryMedias;

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
          Next
        </button>
      )}
    </>
  );
}
export default StepNextButton;
