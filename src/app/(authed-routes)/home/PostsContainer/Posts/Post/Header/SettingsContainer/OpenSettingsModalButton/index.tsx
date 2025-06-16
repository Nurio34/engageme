import { useAppDispatch } from "@/store/hooks";
import { togglePostSettingsModal } from "@/store/slices/modals";
import { Dispatch, SetStateAction } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

function OpenSettingsModalButton({
  setIsModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      className="h-full pl-4 col-start-3 col-end-4 justify-self-end ml-auto"
      onClick={() => {
        setIsModalOpen(true);
        dispatch(togglePostSettingsModal());
      }}
    >
      <HiDotsHorizontal />
    </button>
  );
}
export default OpenSettingsModalButton;
