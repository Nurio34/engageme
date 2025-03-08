import { Dispatch, SetStateAction } from "react";
import { CurrentTabType } from "..";
import { StyleType } from "../../ImageContainer";

function AdjustmentsTab({
  currentTab,
  setStyle,
}: {
  currentTab: CurrentTabType;
  setStyle: Dispatch<SetStateAction<StyleType>>;
}) {
  return currentTab === "adjustments" && <div>AdjustmentsTab</div>;
}
export default AdjustmentsTab;
