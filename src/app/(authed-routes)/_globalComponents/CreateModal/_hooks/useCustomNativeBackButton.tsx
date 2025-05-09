import { useEffect, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggle_WannaCloseCreateModal_Modal } from "@/store/slices/modals";

type ModalState = {
  modalOpen: boolean;
};

export function useCustomNativeBackButton() {
  const { isCreateModalOpen } = useAppSelector((s) => s.modals);
  const dispatch = useAppDispatch();

  const [isCreateModalOpenTurnedTrue, setIsCreateModalOpenTurnedTrue] =
    useState(false);

  useEffect(() => {
    if (isCreateModalOpen) setIsCreateModalOpenTurnedTrue(true);
  }, [isCreateModalOpen]);

  // 1) Stable pop-state handler
  const onPopState = useCallback(() => {
    // only close the modal—don't push another state!
    if (isCreateModalOpen) {
      dispatch(toggle_WannaCloseCreateModal_Modal());
      // if (history.state && (history.state as ModalState).modalOpen) {
      //   history.replaceState(null, "");
      // }
    }
  }, [dispatch, isCreateModalOpen]);

  useEffect(() => {
    if (isCreateModalOpen) {
      // 2) Modal just opened: push one fake entry
      if (!history.state || !(history.state as ModalState).modalOpen) {
        history.pushState(null, "");
      }
      window.addEventListener("popstate", onPopState);
    } else if (!isCreateModalOpen && isCreateModalOpenTurnedTrue) {
      // 3) Modal just closed by UI button: clean up that fake entry
      history.back();

      window.removeEventListener("popstate", onPopState);
    }

    // cleanup if component unmounts
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [isCreateModalOpen, onPopState]);
}
