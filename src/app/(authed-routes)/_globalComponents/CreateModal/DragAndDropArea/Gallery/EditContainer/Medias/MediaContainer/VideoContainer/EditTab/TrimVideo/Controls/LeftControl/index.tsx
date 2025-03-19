import { Dispatch, DragEvent, SetStateAction, useEffect } from "react";
import { CollapseControlType, CursorType, LeftControlType } from "..";

function LeftControl({
  cursor,
  setCursor,
  leftControl,
  setLeftControl,
  collapseControl,
  setCollapseControl,
}: {
  cursor: CursorType;
  setCursor: Dispatch<SetStateAction<CursorType>>;
  leftControl: LeftControlType;
  setLeftControl: Dispatch<SetStateAction<LeftControlType>>;
  collapseControl: CollapseControlType;
  setCollapseControl: Dispatch<SetStateAction<CollapseControlType>>;
}) {
  const { start, end } = cursor;
  const { base, left, isThisDragging, width } = leftControl;
  const { containerWidth, leftPosition, rightPosition } = collapseControl;

  useEffect(() => {
    if (isThisDragging) {
      const diff = end - start;
      if (base + left < 0) return;
      if (leftPosition + rightPosition >= containerWidth) return;

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
    if (leftPosition + rightPosition === containerWidth) {
      console.log({ base, left, leftPosition });
    }
  }, [collapseControl]);

  return (
    <div
      className="absolute top-0 h-full rounded-lg bg-base-100
        flex items-center justify-center font-extrabold 
    "
      style={{ width, left: base + left, cursor: "" }}
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
      |
    </div>
  );
}
export default LeftControl;
