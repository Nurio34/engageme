import { Dispatch, SetStateAction } from "react";

function ViewButton({
  isRepliesVisible,
  setIsRepliesVisible,
}: {
  isRepliesVisible: boolean;
  setIsRepliesVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-x-4 text-xs text-base-content/70"
      onClick={(e) => setIsRepliesVisible((prev) => !prev)}
    >
      <span className="border-b-[1px] w-5 border-base-content" />
      {isRepliesVisible ? "Hide" : "View"} replies
    </button>
  );
}
export default ViewButton;
