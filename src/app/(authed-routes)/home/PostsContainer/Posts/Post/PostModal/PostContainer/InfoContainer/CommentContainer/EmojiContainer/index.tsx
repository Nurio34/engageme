import EmojiIcon from "@/app/_globalComponents/Svg/EmojiIcon";
import Picker from "@/lib/emoji/picker";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { togglePicker } from "@/store/slices/modals";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function EmojiContainer({
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
    <div className="relative grid place-content-center">
      <button type="button" onClick={togglePickerFunction}>
        <EmojiIcon size={24} color="black" />
      </button>
      {isPickerOpen && isPickerVisible && (
        <div className="absolute left-0 bottom-9 w-96 bg-base-100 rounded-lg shadow-[0px_5px_10px_5px] shadow-base-content aspect-square overflow-auto">
          <Picker setMessage={setComment} />
        </div>
      )}
    </div>
  );
}
export default EmojiContainer;
