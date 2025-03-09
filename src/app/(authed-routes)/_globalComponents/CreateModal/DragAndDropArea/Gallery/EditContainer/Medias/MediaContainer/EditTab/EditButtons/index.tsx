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
    <div className="flex gap-1">
      <button
        type="button"
        className={`grow py-2 border-b text-sm transition-colors 
            ${
              currentTab === "filters"
                ? "border-primary text-primary font-semibold"
                : "text-base-content/40 text-xs"
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
                : "text-base-content/40 text-xs"
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
                : "text-base-content/40 text-xs"
            }
          `}
        onClick={() => setCurrentTab("transformations")}
      >
        Transformations
      </button>
      <button
        type="button"
        className={`grow py-2 border-b text-sm transition-colors             
            ${
              currentTab === "ai"
                ? "border-primary text-primary font-semibold"
                : "text-base-300 text-xs"
            }
          `}
        onClick={() => setCurrentTab("ai")}
      >
        AI
      </button>
    </div>
  );
}
export default EditButtons;
