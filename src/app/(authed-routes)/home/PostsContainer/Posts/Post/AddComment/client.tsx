import { useState } from "react";
import EmojiContainer from "./EmojiContainer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { togglePicker } from "@/store/slices/modals";

function Client() {
  const { isPickerOpen } = useAppSelector((s) => s.modals);
  const dispatch = useAppDispatch();

  const [comment, setComment] = useState("");

  const togglePickerFunction = () => {
    if (isPickerOpen) dispatch(togglePicker());
  };

  return (
    <div className="flex items-center">
      <textarea
        rows={1}
        className="grow text-sm mt-2 resize-none  outline-none"
        placeholder="Add a comment.."
        onFocus={togglePickerFunction}
        value={comment}
      />
      <div className="flex items-center gap-x-2">
        <button type="button" className="text-info text-sm font-semibold">
          Post
        </button>
        <EmojiContainer setComment={setComment} />
      </div>
    </div>
  );
}
export default Client;
