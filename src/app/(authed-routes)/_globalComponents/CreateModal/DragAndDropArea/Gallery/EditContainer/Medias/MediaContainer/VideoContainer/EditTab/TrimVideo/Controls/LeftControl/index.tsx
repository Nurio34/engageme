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
  ControlsType,
  LeftControlType,
  RightControlType,
} from "@/app/(authed-routes)/_globalComponents/CreateModal/hooks/useVideoTrimControls";
import { getControlTimes } from "../utils/getControlTimes";
import { handleTime } from "../utils/handleTime";
import CurrentTimeIndicator from "./CurrentTimeIndicator";
import { PlayerTimeType } from "../../../..";

function LeftControl({
  cursor,
  setCursor,
  leftControl,
  setLeftControl,
  collapseControl,
  setCollapseControl,
  duration,
  rightControl,
  playerTime,
  control,
}: {
  cursor: CursorType;
  setCursor: Dispatch<SetStateAction<CursorType>>;
  leftControl: LeftControlType;
  setLeftControl: Dispatch<SetStateAction<LeftControlType>>;
  collapseControl: CollapseControlType;
  setCollapseControl: Dispatch<SetStateAction<CollapseControlType>>;
  duration: number | undefined;
  rightControl: RightControlType;
  playerTime: PlayerTimeType;
  control: ControlsType;
}) {
  const { start, end } = cursor;
  const { base, left, isThisDragging, width } = leftControl;
  const { containerWidth, leftPosition, rightPosition } = collapseControl;

  const [time, setTime] = useState("00:00");

  useEffect(() => {
    if (isThisDragging) {
      const diff = end - start;
      if (base + left < 0) return;
      if (leftPosition + rightPosition + 10 >= containerWidth) return;

      setLeftControl((prev) => ({ ...prev, left: diff }));
      setCollapseControl((prev) => ({
        ...prev,
        leftPosition: width + base + left,
      }));
    }
  }, [cursor]);

  useEffect(() => {
    if (base >= 0) return;
    if (base < 0) {
      setLeftControl((prev) => ({ ...prev, base: 0, left: 0 }));
    }
  }, [leftControl]);

  useEffect(() => {
    if (
      isThisDragging &&
      containerWidth !== 0 &&
      leftPosition + rightPosition + 10 >= containerWidth
    ) {
      setCollapseControl((prev) => {
        setLeftControl((p) => ({
          ...p,
          isThisDragging: false,
          base: prev.containerWidth - prev.rightPosition - 20 - p.width,
          left: 0,
        }));

        return {
          ...prev,
          leftPosition: prev.containerWidth - prev.rightPosition - 20,
        };
      });
    }
  }, [collapseControl]);

  useEffect(() => {
    if (!duration || !collapseControl.containerWidth) return;

    const { startTime } = getControlTimes(
      duration,
      collapseControl,
      leftControl,
      rightControl
    );

    const time = handleTime(startTime);
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
      className="absolute top-0 h-full rounded-lg bg-base-100
        flex items-center justify-center 
    "
      style={{ width, left: base + left, cursor: "ew-resize" }}
      draggable
      onDragStart={(e: DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setDragImage(new Image(), 0, 0);
        setLeftControl((prev) => ({ ...prev, isThisDragging: true }));
        setCursor((prev) => ({ ...prev, start: e.clientX, end: e.clientX }));
      }}
      onDrag={(e: DragEvent<HTMLDivElement>) =>
        setCursor((prev) => ({ ...prev, end: e.clientX }))
      }
      onDragEnd={(e) => {
        setLeftControl((prev) => ({
          ...prev,
          base: prev.base + prev.left,
          left: 0,
          isThisDragging: false,
        }));
        setCursor({ start: 0, end: 0 });
      }}
    >
      <span className="font-extrabold">|</span>
      {isThisDragging && (
        <span className="absolute -top-[15px] text-[10px]">{time}</span>
      )}
      <CurrentTimeIndicator playerTime={playerTime} control={control} />
    </div>
  );
}
export default LeftControl;
