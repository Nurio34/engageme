import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { togglePicker } from "@/store/slices/modals";
import { usePostsContext } from "@/app/(authed-routes)/home/PostsContainer/Posts/Context";

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

  const { CommentAreaRef } = usePostsContext();
  const [commentAreaWidth, setCommentAreaWidth] = useState(0);

  useEffect(() => {
    if (CommentAreaRef.current) {
      setCommentAreaWidth(CommentAreaRef.current.getBoundingClientRect().width);
    }
  }, [comment]);

  useEffect(() => {
    if (!CommentAreaRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        setTextAreaHeight(height);
      }
    });

    observer.observe(CommentAreaRef.current);

    return () => observer.disconnect();
  }, [setTextAreaHeight]);

  const togglePickerFunction = () => {
    if (isPickerOpen) dispatch(togglePicker());
  };

  return (
    <textarea
      ref={CommentAreaRef}
      name="comment"
      id="comment"
      rows={1}
      className={`grow break-words block max-h-20 resize-none outline-none text-sm ${
        isPending ? "text-base-content/50" : ""
      }`}
      style={{
        maxWidth: commentAreaWidth > 0 ? commentAreaWidth : undefined,
      }}
      placeholder="Add a comment..."
      value={comment}
      onChange={(e) => {
        setComment(e.currentTarget.value);
      }}
      onFocus={togglePickerFunction}
      disabled={isPending}
    />
  );
}

export default TextArea;
