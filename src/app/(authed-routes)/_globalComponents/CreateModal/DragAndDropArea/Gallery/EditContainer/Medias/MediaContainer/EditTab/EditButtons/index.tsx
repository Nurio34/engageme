import { Dispatch, SetStateAction } from "react";
import { CurrentTabType } from "..";

function EditButtons({
  currentTab,
  setCurrentTab,
}: {
  currentTab: CurrentTabType;
  setCurrentTab: Dispatch<SetStateAction<CurrentTabType>>;
}) {
  return (
    <div className="flex">
      <button
        type="button"
        className={`grow py-2 border-b text-sm transition-colors 
            ${
              currentTab === "filters"
                ? "border-primary text-primary font-semibold"
                : "text-base-300"
            }
          `}
        onClick={() => setCurrentTab("filters")}
      >
        Filters
      </button>
      <button
        type="button"
        className={`grow py-2 border-b text-sm transition-colors             
            ${
              currentTab === "adjustments"
                ? "border-primary text-primary font-semibold"
                : "text-base-300"
            }
          `}
        onClick={() => setCurrentTab("adjustments")}
      >
        Adjustments
      </button>
      <button
        type="button"
        className={`grow py-2 border-b text-sm transition-colors             
            ${
              currentTab === "transformations"
                ? "border-primary text-primary font-semibold"
                : "text-base-300"
            }
          `}
        onClick={() => setCurrentTab("transformations")}
      >
        Transformations
      </button>
    </div>
  );
}
export default EditButtons;
