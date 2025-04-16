import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCreateModal } from "@/store/slices/modals";

export function useCustomNativeBackButton() {
  const { isCreateModalOpen } = useAppSelector((s) => s.modals);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handlePopState = () => {
      if (isCreateModalOpen) {
        history.pushState(null, "", window.location.href);
        dispatch(toggleCreateModal());
      }
    };

    if (isCreateModalOpen) {
      history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isCreateModalOpen]);
}
