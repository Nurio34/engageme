import { Dispatch, SetStateAction } from "react";
import EmojiContainer from "./EmojiContainer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { togglePicker } from "@/store/slices/modals";

function EmojiComponent({
  comment,
  setComment,
  isPending,
}: {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  isPending: boolean;
}) {
  const { device } = useAppSelector((s) => s.modals);
  const isDesktop = device.type === "desktop";

  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-x-2">
      {comment && (
        <button
          type="submit"
          className="text-info text-sm font-semibold"
          onClick={() => dispatch(togglePicker())}
          disabled={isPending}
        >
          Post
        </button>
      )}
      {isDesktop && <EmojiContainer setComment={setComment} />}
    </div>
  );
}
export default EmojiComponent;
