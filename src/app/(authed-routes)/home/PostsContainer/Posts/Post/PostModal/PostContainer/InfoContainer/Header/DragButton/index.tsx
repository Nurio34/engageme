import { useAppSelector } from "@/store/hooks";
import { MdOutlineDragHandle } from "react-icons/md";
import { useInfoContext } from "../../Context";

function DragButton() {
  const { device } = useAppSelector((s) => s.modals);
  const isDesktop = device.type === "desktop";

  const { setPointer } = useInfoContext();

  return (
    !isDesktop && (
      <button
        type="button"
        className="cursor-grab justify-self-stretch self-stretch grid place-content-center"
        onMouseDown={(e) => {
          setPointer((prev) => ({
            ...prev,
            start_x: e.clientX,
            start_y: e.clientY,
            isDragging: true,
            end_x: e.clientX,
            end_y: e.clientY,
          }));
        }}
        onTouchStart={(e) => {
          const { clientX, clientY } = e.touches[0];
          setPointer((prev) => ({
            ...prev,
            start_x: clientX,
            start_y: clientY,
            isDragging: true,
            end_x: clientX,
            end_y: clientY,
          }));
        }}
      >
        <MdOutlineDragHandle size={32} className="scale-x-[2]" />
      </button>
    )
  );
}
export default DragButton;
