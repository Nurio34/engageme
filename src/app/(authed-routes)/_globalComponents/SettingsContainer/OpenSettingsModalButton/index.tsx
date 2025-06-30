import { useAppDispatch } from "@/store/hooks";
import { togglePostSettingsModal } from "@/store/slices/modals";
import { HiDotsHorizontal } from "react-icons/hi";

function OpenSettingsModalButton() {
  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      className="h-full pl-4 col-start-3 col-end-4 justify-self-end ml-auto"
      onClick={() => dispatch(togglePostSettingsModal())}
    >
      <HiDotsHorizontal />
    </button>
  );
}
export default OpenSettingsModalButton;
