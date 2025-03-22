import {
  Dispatch,
  DragEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CursorType } from "..";
import {
  CollapseControlType,
  LeftControlType,
  RightControlType,
} from "@/app/(authed-routes)/_globalComponents/CreateModal/hooks/useVideoTrimControls";
import { getControlTimes } from "../utils/getControlTimes";
import { handleTime } from "../utils/handleTime";

function RightControl({
  cursor,
  setCursor,
  rightControl,
  setRightControl,
  collapseControl,
  setCollapseControl,
  duration,
  leftControl,
}: {
  cursor: CursorType;
  setCursor: Dispatch<SetStateAction<CursorType>>;
  rightControl: RightControlType;
  setRightControl: Dispatch<SetStateAction<RightControlType>>;
  collapseControl: CollapseControlType;
  setCollapseControl: Dispatch<SetStateAction<CollapseControlType>>;
  duration: number | undefined;
  leftControl: LeftControlType;
}) {
  const { start, end } = cursor;
  const { base, right, isThisDragging, width } = rightControl;
  const { containerWidth, leftPosition, rightPosition } = collapseControl;

  const [time, setTime] = useState("00:00");

  useEffect(() => {
    if (isThisDragging) {
      const diff = start - end;

      if (base + right < 0) return;
      if (leftPosition + rightPosition + 10 >= containerWidth) return;

      setRightControl((prev) => ({ ...prev, right: diff }));
      setCollapseControl((prev) => ({
        ...prev,
        rightPosition: width + base + right,
      }));
    }
  }, [cursor]);

  useEffect(() => {
    if (base >= 0) return;
    if (base < 0) {
      setRightControl((prev) => ({ ...prev, base: 0, right: 0 }));
    }
  }, [rightControl]);

  useEffect(() => {
    if (
      isThisDragging &&
      containerWidth !== 0 &&
      leftPosition + rightPosition + 10 >= containerWidth
    ) {
      setCollapseControl((prev) => {
        setRightControl((p) => ({
          ...p,
          isThisDragging: false,
          base: prev.containerWidth - prev.leftPosition - 20 - p.width,
          right: 0,
        }));

        return {
          ...prev,
          rightPosition: prev.containerWidth - prev.leftPosition - 20,
        };
      });
    }
  }, [collapseControl]);

  useEffect(() => {
    if (!duration || !collapseControl.containerWidth) return;

    const { endTime } = getControlTimes(
      duration,
      collapseControl,
      leftControl,
      rightControl
    );
    const time = handleTime(endTime);
    setTime(time);
  }, [
    leftControl.isThisDragging,
    rightControl.isThisDragging,
    duration,
    collapseControl.containerWidth,
    cursor,
  ]);

  return (
    <div
      className="absolute top-0 h-full rounded-lg w-[10px] bg-base-100
          flex items-center justify-center 
      "
      style={{ width, right: base + right, cursor: "ew-resize" }}
      draggable
      onDragStart={(e: DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setDragImage(new Image(), 0, 0);
        setRightControl((prev) => ({ ...prev, isThisDragging: true }));
        setCursor((prev) => ({ ...prev, start: e.clientX, end: e.clientX }));
      }}
      onDrag={(e: DragEvent<HTMLDivElement>) =>
        setCursor((prev) => ({ ...prev, end: e.clientX }))
      }
      onDragEnd={() => {
        setRightControl((prev) => ({
          ...prev,
          base: prev.base + prev.right,
          right: 0,
          isThisDragging: false,
        }));
        setCursor({ start: 0, end: 0 });
      }}
    >
      <span className="font-extrabold">|</span>
      {isThisDragging && (
        <span className="absolute -top-[15px] text-[10px]">{time}</span>
      )}
    </div>
  );
}
export default RightControl;
