import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

function Client() {
  const {
    isCreateModalOpen,
    isWannaCloseCreateModalOpen,
    isPickerOpen,
    isPostSettingsModalOpen,
    isSuggestedForYouModalOpen,
  } = useAppSelector((s) => s.modals);

  const { postModal } = useAppSelector((s) => s.homePage);
  const { isOpen } = postModal;

  const { isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  const { device } = useAppSelector((s) => s.modals);
  const isMobile = device.type === "mobile";

  useEffect(() => {
    if (
      isCreateModalOpen ||
      isWannaCloseCreateModalOpen ||
      isPickerOpen ||
      isOpen ||
      isDrawerMenuOpen ||
      isPostSettingsModalOpen ||
      isSuggestedForYouModalOpen
    ) {
      document.body.style.overflow = "hidden";
      if (isMobile) document.body.style.marginInlineEnd = "0px";
      else document.body.style.marginInlineEnd = "14px";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.marginInlineEnd = "0px";
    }
  }, [
    isCreateModalOpen,
    isWannaCloseCreateModalOpen,
    isPickerOpen,
    isOpen,
    isDrawerMenuOpen,
    isPostSettingsModalOpen,
    isSuggestedForYouModalOpen,
    isMobile,
  ]);

  return <div hidden />;
}
export default Client;
