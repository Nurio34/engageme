import { useCreateModalContext } from "../Context";
import StepBackButton from "./StepBackButton";
import StepNextButton from "./StepNextButton";
import Title from "./Title";

function Header() {
  const { step } = useCreateModalContext();

  return (
    <div
      className={`py-[1vh] border-b border-base-content/30 text-center font-semibold
        flex items-center px-[1vw] ${
          step === "new" ? "justify-center" : "justify-between"
        }
      `}
    >
      {step !== "new" && <StepBackButton />}
      <Title />
      {step !== "new" && <StepNextButton />}
    </div>
  );
}
export default Header;
