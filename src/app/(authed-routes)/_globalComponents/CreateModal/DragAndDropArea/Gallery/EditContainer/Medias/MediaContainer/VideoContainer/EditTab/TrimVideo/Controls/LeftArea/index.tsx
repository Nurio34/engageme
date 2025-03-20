import { LeftControlType } from "@/app/(authed-routes)/_globalComponents/CreateModal/hooks/useVideoTrimControls";

function LeftArea({ leftControl }: { leftControl: LeftControlType }) {
  const { base, left } = leftControl;
  return (
    <div
      className="absolute top-0 left-0 h-full bg-base-content/60 rounded-tl-lg rounded-bl-lg"
      style={{ width: base + left }}
    />
  );
}
export default LeftArea;
