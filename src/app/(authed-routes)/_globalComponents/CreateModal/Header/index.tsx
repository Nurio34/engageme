import LoadingGradient from "@/app/_globalComponents/LoadingGradient";
import { useCreateModalContext } from "../Context";
import StepBackButton from "./StepBackButton";
import StepNextButton from "./StepNextButton";
import Title from "./Title";

function Header() {
  const { step, cloudinaryMedias } = useCreateModalContext();
  const { isLoading } = cloudinaryMedias;

  return (
    <div>
      <div
        className={`py-[1vh] border-b border-base-content/30 text-center font-semibold
        flex items-center px-[2vw] md:px-[1vw] ${
          step.step === "new" ? "justify-center" : "justify-between"
        }
        `}
      >
        {step.step !== "new" && <StepBackButton />}
        <Title />
        {step.step !== "new" && <StepNextButton />}
      </div>
      {step.step === "edit" && isLoading && <LoadingGradient />}
    </div>
  );
}
export default Header;
