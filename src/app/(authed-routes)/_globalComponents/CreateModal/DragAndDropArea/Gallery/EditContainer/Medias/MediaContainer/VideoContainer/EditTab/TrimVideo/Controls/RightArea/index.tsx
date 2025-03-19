import { RightControlType } from "..";

function RightArea({ rightControl }: { rightControl: RightControlType }) {
  const { base, right } = rightControl;

  return (
    <div
      className="absolute top-0 right-0 h-full bg-base-content/60"
      style={{ width: base + right }}
    />
  );
}
export default RightArea;
