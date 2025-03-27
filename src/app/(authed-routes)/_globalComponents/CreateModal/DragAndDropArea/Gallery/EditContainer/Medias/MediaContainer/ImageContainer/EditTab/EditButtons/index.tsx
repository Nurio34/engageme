import { Dispatch, RefObject, SetStateAction } from "react";
import { CurrentTabType } from "..";
import { RxThickArrowRight } from "react-icons/rx";
import { EditTabTranslateXType } from "../../../CloseSlider/useEditTabControl";

function EditButtons({
  currentTab,
  setCurrentTab,
  setEditTabTranslateX,
  EditTabWidth,
}: {
  currentTab: CurrentTabType;
  setCurrentTab: Dispatch<SetStateAction<CurrentTabType>>;
  setEditTabTranslateX: Dispatch<SetStateAction<EditTabTranslateXType>>;
  EditTabWidth: RefObject<number>;
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
        className="lg:hidden px-2 bg-base-content rounded-tl-lg rounded-bl-lg"
        onClick={() =>
          setEditTabTranslateX({
            old: EditTabWidth.current,
            new: EditTabWidth.current,
          })
        }
      >
        <RxThickArrowRight size={24} className="text-base-100" />
      </button>
    </div>
  );
}
export default EditButtons;
