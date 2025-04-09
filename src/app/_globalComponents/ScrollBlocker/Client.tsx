import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

function Client() {
  const { isCreateModalOpen, isWannaCloseCreateModalOpen, isPickerOpen } =
    useAppSelector((s) => s.modals);

  useEffect(() => {
    if (isCreateModalOpen || isWannaCloseCreateModalOpen || isPickerOpen)
      document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isCreateModalOpen, isWannaCloseCreateModalOpen, isPickerOpen]);

  return <div hidden />;
}
export default Client;
