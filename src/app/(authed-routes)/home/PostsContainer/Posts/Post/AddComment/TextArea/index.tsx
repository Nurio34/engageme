import { Dispatch, SetStateAction } from "react";

function TextArea({
  togglePickerFunction,
  comment,
  setComment,
  isPending,
}: {
  togglePickerFunction: () => void;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  isPending: boolean;
}) {
  return (
    <textarea
      name="comment"
      rows={1}
      className={`grow text-sm mt-2 resize-none outline-none bg-base-100
        ${isPending ? "text-base-content/50" : ""}  
      `}
      placeholder="Add a comment.."
      onFocus={togglePickerFunction}
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      disabled={isPending}
    />
  );
}
export default TextArea;
