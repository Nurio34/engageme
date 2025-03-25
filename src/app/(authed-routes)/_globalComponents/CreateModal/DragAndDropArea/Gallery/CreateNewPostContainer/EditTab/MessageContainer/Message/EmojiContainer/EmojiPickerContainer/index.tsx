import EmojiIcon from "@/app/_globalComponents/Svg/EmojiIcon";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { RefObject } from "react";

function EmojiPickerContainer({
  EditTabWidth,
}: {
  EditTabWidth: RefObject<number>;
}) {
  const {
    setMessage,
    isEmojiPickerOpen,
    setIsEmojiPickerOpen,
    setIsPlacesModalOpen,
  } = useCreateModalContext();
  console.log(EditTabWidth, setMessage);

  const toggleEmojiPicker = () => setIsEmojiPickerOpen((prev) => !prev);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleEmojiPicker();
          setIsPlacesModalOpen(false);
        }}
      >
        <EmojiIcon />
      </button>

      <div
        className={`absolute z-10 top-full left-0  transition-all duration-500
          ${isEmojiPickerOpen ? "h-[400px] " : "h-0 opacity-0 overflow-hidden"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* <EmojiPicker
          lazyLoadEmojis
          width={EditTabWidth.current - 32 - 28}
          height={400}
          onEmojiClick={handleEmojiClick}
        /> */}
      </div>
    </div>
  );
}
export default EmojiPickerContainer;
