import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

function Client() {
  const {
    isCreateModalOpen,
    isWannaCloseCreateModalOpen,
    isPickerOpen,
    isPostSettingsModalOpen,
  } = useAppSelector((s) => s.modals);

  const { postModal } = useAppSelector((s) => s.homePage);
  const { isOpen } = postModal;

  const { isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  useEffect(() => {
    if (
      isCreateModalOpen ||
      isWannaCloseCreateModalOpen ||
      isPickerOpen ||
      isOpen ||
      isDrawerMenuOpen ||
      isPostSettingsModalOpen
    )
      document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [
    isCreateModalOpen,
    isWannaCloseCreateModalOpen,
    isPickerOpen,
    isOpen,
    isDrawerMenuOpen,
    isPostSettingsModalOpen,
  ]);

  return <div hidden />;
}
export default Client;
