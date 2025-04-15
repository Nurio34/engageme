import { Dispatch, SetStateAction } from "react";

function ShowMoreRepliesButton({
  setShownRepliesAmount,
  totalRepliesAmount,
  shownRepliesAmount,
}: {
  setShownRepliesAmount: Dispatch<SetStateAction<number>>;
  totalRepliesAmount: number;
  shownRepliesAmount: number;
}) {
  const isAllRepliesShown = totalRepliesAmount === shownRepliesAmount;

  return (
    !isAllRepliesShown && (
      <button
        type="button"
        className="w-full flex justify-center items-center gap-x-4"
        onClick={() => setShownRepliesAmount((prev) => prev + 5)}
      >
        <div className="border-t-[1px] border-base-content/70 w-4 " />

        <div
          className="text-sm text-base-content/70
        flex items-center gap-x-1
      "
        >
          <span>Show More</span>
          <span>{`(${totalRepliesAmount - shownRepliesAmount})`}</span>
        </div>

        <div className="border-t-[1px] border-base-content/70 w-4 " />
      </button>
    )
  );
}
export default ShowMoreRepliesButton;
