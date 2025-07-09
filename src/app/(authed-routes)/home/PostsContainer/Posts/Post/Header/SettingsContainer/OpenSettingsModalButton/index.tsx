import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closePostSettingsModal,
  togglePostSettingsModal,
} from "@/store/slices/modals";
import { Dispatch, SetStateAction, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

function OpenSettingsModalButton({
  setIsModelOpen,
}: {
  setIsModelOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();

  const { isPostSettingsModalOpen } = useAppSelector((s) => s.modals);

  useEffect(() => {
    const handlePopstate = () => {
      if (isPostSettingsModalOpen) dispatch(closePostSettingsModal());
    };

    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, [isPostSettingsModalOpen]);

  return (
    <button
      type="button"
      // className="h-full pl-4 col-start-3 col-end-4 justify-self-end ml-auto"
      onClick={() => {
        setIsModelOpen(true);
        dispatch(togglePostSettingsModal());
        history.pushState(
          { isPostSettingsModalOpen: true },
          "",
          window.location.href
        );
      }}
    >
      <HiDotsHorizontal />
    </button>
  );
}
export default OpenSettingsModalButton;
