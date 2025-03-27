import GradientBar from "@/app/_globalComponents/LoadingComponents/GradientBar";
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
           step.step === "new" || step.step === "sharing"
             ? "justify-center"
             : "justify-between"
         }
        `}
      >
        {step.step !== "new" && <StepBackButton />}
        <Title />
        {step.step !== "new" && <StepNextButton />}
      </div>
      {step.step === "edit" && isLoading && <GradientBar />}
    </div>
  );
}
export default Header;
