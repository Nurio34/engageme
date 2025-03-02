import { FaLongArrowAltLeft } from "react-icons/fa";
import { StepType, useCreateModalContext } from "../../Context";
import { useAppDispatch } from "@/store/hooks";
import { toggle_WannaCloseCreateModal_Modal } from "@/store/slices/modals";

function StepBackButton() {
  const { goPrevStep } = useCreateModalContext();

  return (
    <button type="button" onClick={goPrevStep}>
      <FaLongArrowAltLeft size={24} />
    </button>
  );
}
export default StepBackButton;
