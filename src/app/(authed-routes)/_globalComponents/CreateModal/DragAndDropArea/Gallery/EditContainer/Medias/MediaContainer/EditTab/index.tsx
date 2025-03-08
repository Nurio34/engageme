import { Dispatch, SetStateAction, useState } from "react";
import EditButtons from "./EditButtons";
import FiltersTab from "./FiltersTab";
import AdjustmentsTab from "./AdjustmentsTab";
import { StyleType } from "../ImageContainer";
import TransformationsTab from "./TransformationsTab";

export type CurrentTabType = "filters" | "adjustments" | "transformations";

function EditTab({
  urlState,
  setStyle,
}: {
  urlState: string;
  setStyle: Dispatch<SetStateAction<StyleType>>;
}) {
  const [currentTab, setCurrentTab] = useState<CurrentTabType>("filters");

  return (
    <div className="grow border-l flex flex-col">
      <EditButtons currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <FiltersTab
        currentTab={currentTab}
        urlState={urlState}
        setStyle={setStyle}
      />
      <AdjustmentsTab currentTab={currentTab} setStyle={setStyle} />
      <TransformationsTab currentTab={currentTab} urlState={urlState} />
    </div>
  );
}
export default EditTab;
