import { Dispatch, SetStateAction } from "react";

function ViewButton({
  isRepliesVisible,
  setIsRepliesVisible,
  setShownRepliesAmount,
}: {
  isRepliesVisible: boolean;
  setIsRepliesVisible: Dispatch<SetStateAction<boolean>>;
  setShownRepliesAmount: Dispatch<SetStateAction<number>>;
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-x-4 text-xs text-base-content/70"
      onClick={() => {
        if (!isRepliesVisible) setShownRepliesAmount(5);
        setIsRepliesVisible((prev) => !prev);
      }}
    >
      <span className="border-b-[1px] w-5 border-base-content" />
      {isRepliesVisible ? "Hide" : "View"} replies
    </button>
  );
}
export default ViewButton;
