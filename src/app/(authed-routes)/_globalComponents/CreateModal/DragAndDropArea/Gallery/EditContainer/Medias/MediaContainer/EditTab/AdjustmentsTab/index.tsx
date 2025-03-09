import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CurrentTabType } from "..";
import { StyleType } from "../../ImageContainer";
import Control from "./Control";

export type ControlType = {
  label: string;
  name: string;
  value: number;
};

function AdjustmentsTab({
  currentTab,
  style,
  setStyle,
  setOtherStyle,
}: {
  currentTab: CurrentTabType;
  style: StyleType;
  setStyle: Dispatch<SetStateAction<StyleType>>;
  setOtherStyle: Dispatch<SetStateAction<StyleType>>;
}) {
  const initialControls: ControlType[] = [
    {
      label: "brightness",
      name: "brightness",
      value: style["brightness"] || 0,
    },
    {
      label: "contrast",
      name: "contrast",
      value: style["contrast"] || 0,
    },
    {
      label: "fade",
      name: "blur",
      value: style["blur"] || 0,
    },
    {
      label: "saturation",
      name: "saturate",
      value: style["saturate"] || 0,
    },
    {
      label: "temperature",
      name: "hue-rotate",
      value: style["hue-rotate"] || 0,
    },
    {
      label: "vignette",
      name: "sepia",
      value: style["sepia"] || 0,
    },
  ];

  const [controls, setControls] = useState<ControlType[]>(initialControls);
  useEffect(() => {
    setControls(initialControls);
  }, [style]);

  return (
    currentTab === "adjustments" && (
      <div>
        <ul>
          {controls.map((control) => (
            <Control
              key={control.name}
              control={control}
              setStyle={setStyle}
              setOtherStyle={setOtherStyle}
            />
          ))}
        </ul>
      </div>
    )
  );
}
export default AdjustmentsTab;
