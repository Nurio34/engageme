import { Dispatch, SetStateAction } from "react";
import EmojiContainer from "./EmojiContainer";
import { useAppDispatch } from "@/store/hooks";
import { togglePicker } from "@/store/slices/modals";

function EmojiComponent({
  comment,
  setComment,
  isLoading,
}: {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-x-2">
      {comment && (
        <button
          type="submit"
          className="text-info text-sm font-semibold"
          onClick={() => dispatch(togglePicker())}
          disabled={isLoading}
        >
          Post
        </button>
      )}
      <EmojiContainer setComment={setComment} />
    </div>
  );
}
export default EmojiComponent;
