import EmojiIcon from "@/app/_globalComponents/Svg/EmojiIcon";
import Picker from "@/lib/emoji/picker";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { togglePicker } from "@/store/slices/modals";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function Client({
  setComment,
}: {
  setComment: Dispatch<SetStateAction<string>>;
}) {
  const { isPickerOpen } = useAppSelector((s) => s.modals);
  const dispatch = useAppDispatch();

  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const togglePickerFunction = () => {
    dispatch(togglePicker());
    setIsPickerVisible((prev) => !prev);
  };

  useEffect(() => {
    if (!isPickerOpen) setIsPickerVisible(false);
  }, [isPickerOpen]);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Emoji icon"
        className="grid place-content-center"
        onClick={togglePickerFunction}
      >
        <EmojiIcon />
      </button>
      {isPickerVisible && isPickerOpen && (
        <div className="absolute bottom-7 w-80 aspect-square overflow-auto bg-base-100 shadow-xl rounded-lg">
          <Picker setMessage={setComment} />
        </div>
      )}
    </div>
  );
}
export default Client;
