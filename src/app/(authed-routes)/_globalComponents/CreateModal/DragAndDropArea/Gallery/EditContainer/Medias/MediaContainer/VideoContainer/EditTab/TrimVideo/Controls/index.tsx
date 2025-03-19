import { DragEvent, Ref, useEffect, useRef, useState } from "react";
import LeftControl from "./LeftControl";
import RightControl from "./RightControl";
import LeftArea from "./LeftArea";
import RightArea from "./RightArea";

export type CursorType = { start: number; end: number };

export type LeftControlType = {
  base: number;
  left: number;
  isThisDragging: boolean;
  width: number;
};
export type RightControlType = {
  base: number;
  right: number;
  isThisDragging: boolean;
  width: number;
};

export type CollapseControlType = {
  containerWidth: number;
  leftPosition: number;
  rightPosition: number;
};

function Controls() {
  const [cursor, setCursor] = useState<CursorType>({ start: 0, end: 0 });
  const [leftControl, setLeftControl] = useState<LeftControlType>({
    base: 0,
    left: 0,
    isThisDragging: false,
    width: 10,
  });
  const [rightControl, setRightControl] = useState<RightControlType>({
    base: 0,
    right: 0,
    isThisDragging: false,
    width: 10,
  });

  const ControlsContainerRef = useRef<HTMLDivElement | null>(null);

  const [collapseControl, setCollapseControl] = useState<CollapseControlType>({
    containerWidth: 0,
    leftPosition: leftControl.width,
    rightPosition: rightControl.width,
  });

  useEffect(() => {
    if (ControlsContainerRef.current) {
      const width = Math.round(
        ControlsContainerRef.current.getBoundingClientRect().width
      );
      setCollapseControl((prev) => ({ ...prev, containerWidth: width }));
    }
  }, []);

  return (
    <div
      ref={ControlsContainerRef}
      className="absolute top-0 left-0 w-full h-full rounded-lg"
    >
      <LeftArea leftControl={leftControl} />
      <LeftControl
        cursor={cursor}
        setCursor={setCursor}
        leftControl={leftControl}
        setLeftControl={setLeftControl}
        collapseControl={collapseControl}
        setCollapseControl={setCollapseControl}
      />
      <RightControl
        cursor={cursor}
        setCursor={setCursor}
        rightControl={rightControl}
        setRightControl={setRightControl}
        collapseControl={collapseControl}
        setCollapseControl={setCollapseControl}
      />
      <RightArea rightControl={rightControl} />
    </div>
  );
}
export default Controls;
