import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

function Client() {
  const { isCreateModalOpen, isWannaCloseCreateModalOpen, isPickerOpen } =
    useAppSelector((s) => s.modals);

  const { postModal } = useAppSelector((s) => s.homePage);
  const { isOpen } = postModal;

  useEffect(() => {
    if (
      isCreateModalOpen ||
      isWannaCloseCreateModalOpen ||
      isPickerOpen ||
      isOpen
    )
      document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isCreateModalOpen, isWannaCloseCreateModalOpen, isPickerOpen, isOpen]);

  return <div hidden />;
}
export default Client;
