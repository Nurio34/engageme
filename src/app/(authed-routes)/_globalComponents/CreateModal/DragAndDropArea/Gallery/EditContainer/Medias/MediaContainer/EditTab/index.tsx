import { Dispatch, SetStateAction, useState } from "react";
import EditButtons from "./EditButtons";
import FiltersTab from "./FiltersTab";
import AdjustmentsTab from "./AdjustmentsTab";
import { StyleType } from "../ImageContainer";
import TransformationsTab from "./TransformationsTab";

export type CurrentTabType =
  | "filters"
  | "adjustments"
  | "transformations"
  | "ai";

function EditTab({
  url,
  style,
  setStyle,
  setOtherStyle,
  setUrlState,
  setIsNewUrlDownloading,
}: {
  url: string;
  style: StyleType;
  setStyle: Dispatch<SetStateAction<StyleType>>;
  setOtherStyle: Dispatch<SetStateAction<StyleType>>;
  setUrlState: Dispatch<SetStateAction<string>>;
  setIsNewUrlDownloading: Dispatch<SetStateAction<boolean>>;
}) {
  const [currentTab, setCurrentTab] = useState<CurrentTabType>("filters");

  return (
    <div className="grow border-l flex flex-col">
      <EditButtons currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <FiltersTab currentTab={currentTab} url={url} setStyle={setStyle} />
      {
        <AdjustmentsTab
          currentTab={currentTab}
          style={style}
          setStyle={setStyle}
          setOtherStyle={setOtherStyle}
        />
      }
      <TransformationsTab
        currentTab={currentTab}
        url={url}
        setUrlState={setUrlState}
        setIsNewUrlDownloading={setIsNewUrlDownloading}
      />
    </div>
  );
}
export default EditTab;
