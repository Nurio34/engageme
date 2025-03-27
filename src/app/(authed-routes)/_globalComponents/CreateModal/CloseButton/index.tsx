import { VscClose } from "react-icons/vsc";
import { useCreateModalContext } from "../Context";

function CloseButton() {
  const { step } = useCreateModalContext();

  return (
    <button
      type="button"
      className={`absolute z-10 top-10 right-0 lg:top-7 lg:right-7 btn btn-ghost
        ${step.step === "new" ? "block" : "hidden lg:block"}  
      `}
    >
      <VscClose size={28} className="text-base-content lg:text-base-100 " />
    </button>
  );
}
export default CloseButton;
