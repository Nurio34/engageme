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

  useEffect(() => {
    console.log({
      isCreateModalOpen,
      isWannaCloseCreateModalOpen,
      isPickerOpen,
      isOpen,
      isDrawerMenuOpen,
      isPostSettingsModalOpen,
      isSuggestedForYouModalOpen,
    });

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
      document.body.style.marginInlineEnd = "16px";
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
  ]);

  return <div hidden />;
}
export default Client;
