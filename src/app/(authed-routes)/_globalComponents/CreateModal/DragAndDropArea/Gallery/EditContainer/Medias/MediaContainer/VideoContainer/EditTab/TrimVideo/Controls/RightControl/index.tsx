import { Dispatch, DragEvent, SetStateAction, useEffect } from "react";
import { CursorType } from "..";
import {
  CollapseControlType,
  RightControlType,
} from "@/app/(authed-routes)/_globalComponents/CreateModal/hooks/useVideoTrimControls";

function RightControl({
  cursor,
  setCursor,
  rightControl,
  setRightControl,
  collapseControl,
  setCollapseControl,
}: {
  cursor: CursorType;
  setCursor: Dispatch<SetStateAction<CursorType>>;
  rightControl: RightControlType;
  setRightControl: Dispatch<SetStateAction<RightControlType>>;
  collapseControl: CollapseControlType;
  setCollapseControl: Dispatch<SetStateAction<CollapseControlType>>;
}) {
  const { start, end } = cursor;
  const { base, right, isThisDragging, width } = rightControl;
  const { containerWidth, leftPosition, rightPosition } = collapseControl;

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

  return (
    <div
      className="absolute top-0 h-full rounded-lg w-[10px] bg-base-100
          flex items-center justify-center font-extrabold
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
      onDragEnd={(e) => {
        setRightControl((prev) => ({
          ...prev,
          base: prev.base + prev.right,
          right: 0,
          isThisDragging: false,
        }));
        setCursor({ start: 0, end: 0 });
      }}
    >
      |
    </div>
  );
}
export default RightControl;
