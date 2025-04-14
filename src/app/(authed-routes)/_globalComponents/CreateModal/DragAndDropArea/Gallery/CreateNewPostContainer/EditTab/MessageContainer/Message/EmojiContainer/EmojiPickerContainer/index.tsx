import EmojiIcon from "@/app/_globalComponents/Svg/EmojiIcon";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { RefObject } from "react";
import Picker from "@/lib/emoji/picker";

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
          flex gap-1 flex-wrap bg-base-content rounded-lg p-1 overflow-auto
          ${
            isEmojiPickerOpen
              ? "h-[300px] opacity-1"
              : "h-0 opacity-0 overflow-hidden"
          }
        `}
        style={{ width: EditTabWidth.current - 32 - 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Picker setMessage={setMessage} />
      </div>
    </div>
  );
}
export default EmojiPickerContainer;
