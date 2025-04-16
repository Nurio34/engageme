import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPostModal } from "@/store/slices/homePage";

export function useCustomNativeBackButton() {
  const { postModal } = useAppSelector((s) => s.homePage);
  const { isOpen } = postModal;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        history.pushState(null, "", window.location.href);
        dispatch(setPostModal({ postId: "", isOpen: false }));
      }
    };

    if (isOpen) {
      history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);
}
