import Chevron from "@/app/_globalComponents/Svg/Chevron";
import { Dispatch, SetStateAction, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { SortByType } from "..";

function SortComments({
  sortBy,
  setSortBy,
}: {
  sortBy: SortByType;
  setSortBy: Dispatch<SetStateAction<SortByType>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative my-4 w-40">
      <button
        className="flex items-center gap-x-2 text-base-content/70"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {sortBy} <Chevron rotate={180} />
      </button>
      {isOpen && (
        <div className="absolute top-8 z-10 grid gap-y-2 bg-base-100 text-base-content/70 shadow-[0px_0px_5px] rounded-lg">
          <button
            type="button"
            className="grid grid-cols-[1rem,1fr] btn btn-ghost m-2 mb-0"
            onClick={() => {
              setSortBy("For You");
              setIsOpen(false);
            }}
          >
            {sortBy === "For You" && <FaCheck className="text-base-content" />}
            <span className="col-start-2 col-end-3 justify-self-start">
              For You
            </span>
          </button>
          <hr />
          <button
            type="button"
            className="grid grid-cols-[1rem,1fr] btn btn-ghost m-2 mb-0"
            onClick={() => {
              setSortBy("Most Recent");
              setIsOpen(false);
            }}
          >
            {sortBy === "Most Recent" && (
              <FaCheck className="text-base-content" />
            )}
            <span className="col-start-2 col-end-3 justify-self-start">
              {" "}
              Most Recent
            </span>
          </button>
          <hr />
          <button
            type="button"
            className="grid grid-cols-[1rem,1fr] btn btn-ghost m-2 mt-0"
            onClick={() => {
              setSortBy("Meta Verified");
              setIsOpen(false);
            }}
          >
            {sortBy === "Meta Verified" && (
              <FaCheck className="text-base-content" />
            )}
            <span className="col-start-2 col-end-3 justify-self-start">
              Meta Verified
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
export default SortComments;
