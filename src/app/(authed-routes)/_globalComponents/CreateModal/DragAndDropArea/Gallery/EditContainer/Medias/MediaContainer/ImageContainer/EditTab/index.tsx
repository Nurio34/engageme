import { Dispatch, SetStateAction, useRef, useState } from "react";
import EditButtons from "./EditButtons";
import FiltersTab from "./FiltersTab";
import AdjustmentsTab from "./AdjustmentsTab";
import TransformationsTab from "./TransformationsTab";
import { StyleType } from "..";
import { devControls } from "@/devUtils";
import CloseSlider from "../../CloseSlider";
import { useEditTabControl } from "../../CloseSlider/useEditTabControl";

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
  const EditTabRef = useRef<HTMLDivElement | null>(null);
  const [isEditRequested, setIsEditRequested] = useState(false);

  const {
    editTabTranslateX,
    setEditTabTranslateX,
    EditTabWidth,
    touchX,
    setTouchX,
  } = useEditTabControl(EditTabRef, isEditRequested);

  return (
    <div
      ref={EditTabRef}
      className={`absolute lg:relative right-0 top-0 bg-base-100 z-20 h-full md:grow border-l flex flex-col
        ${
          isEditRequested && touchX.isDragEnd
            ? "transition-transform"
            : "transition-none"
        }  
      `}
      style={{
        width: "calc(100% - 64px)",
        transform: `translateX(${editTabTranslateX.new}px)`,
      }}
    >
      <EditButtons
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setEditTabTranslateX={setEditTabTranslateX}
        EditTabWidth={EditTabWidth}
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
      <CloseSlider
        editTabTranslateX={editTabTranslateX}
        setEditTabTranslateX={setEditTabTranslateX}
        EditTabWidth={EditTabWidth}
        setTouchX={setTouchX}
        setIsEditRequested={setIsEditRequested}
      />
    </div>
  );
}
export default EditTab;
