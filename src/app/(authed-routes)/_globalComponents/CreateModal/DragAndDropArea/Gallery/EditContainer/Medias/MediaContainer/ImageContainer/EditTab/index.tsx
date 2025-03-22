import { Dispatch, SetStateAction, useState } from "react";
import EditButtons from "./EditButtons";
import FiltersTab from "./FiltersTab";
import AdjustmentsTab from "./AdjustmentsTab";
import TransformationsTab from "./TransformationsTab";
import { StyleType } from "..";
import { devControls } from "@/devUtils";
import CloseSlider from "./CloseSlider";

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
  const [isEditTabOpen, setIsEditTabOpen] = useState(true);

  return (
    <div
      className={`absolute right-0 top-0 bg-base-100 z-20 md:relative h-full md:grow border-l flex flex-col transition-transform
        ${isEditTabOpen ? "" : "translate-x-full"}  
      `}
      style={{ width: "calc(100% - 32px)" }}
    >
      <EditButtons
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setIsEditTabOpen={setIsEditTabOpen}
      />
      <FiltersTab currentTab={currentTab} url={url} setStyle={setStyle} />
      <AdjustmentsTab
        currentTab={currentTab}
        style={style}
        setStyle={setStyle}
        setOtherStyle={setOtherStyle}
      />
      {devControls.TransformationsTab && (
        <TransformationsTab
          currentTab={currentTab}
          url={url}
          setUrlState={setUrlState}
          setIsNewUrlDownloading={setIsNewUrlDownloading}
        />
      )}
      <CloseSlider />
    </div>
  );
}
export default EditTab;
