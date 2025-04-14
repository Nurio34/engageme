import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { togglePicker } from "@/store/slices/modals";

function TextArea({
  comment,
  setComment,
  setTextAreaHeight,
  isPending,
}: {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  setTextAreaHeight: Dispatch<SetStateAction<number>>;
  isPending: boolean;
}) {
  const { isPickerOpen } = useAppSelector((s) => s.modals);
  const dispatch = useAppDispatch();

  const TextAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [areaWidth, setAreaWidth] = useState(0);

  useEffect(() => {
    if (TextAreaRef.current) {
      setAreaWidth(TextAreaRef.current.getBoundingClientRect().width);
    }
  }, [comment]);

  useEffect(() => {
    if (!TextAreaRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        setTextAreaHeight(height);
      }
    });

    observer.observe(TextAreaRef.current);

    return () => observer.disconnect();
  }, [setTextAreaHeight]);

  const togglePickerFunction = () => {
    if (isPickerOpen) dispatch(togglePicker());
  };

  return (
    <textarea
      ref={TextAreaRef}
      name="comment"
      id="comment"
      rows={1}
      className={`grow max-h-20 resize-none outline-none text-sm ${
        isPending ? "text-base-content/50" : ""
      }`}
      style={{ maxWidth: areaWidth > 0 ? areaWidth : undefined }}
      placeholder="Add a comment..."
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      onFocus={togglePickerFunction}
      disabled={isPending}
    />
  );
}

export default TextArea;
