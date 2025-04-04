import "./index.css";

function GradientCircle({
  isLoading,
  width,
  inset,
}: {
  isLoading: boolean;
  width?: number;
  inset?: number;
}) {
  const animationState = isLoading ? "running" : "paused";

  return (
    <div
      className="GradientCircle w-24 aspect-square rounded-full"
      style={
        {
          "--animationState": animationState,
          "--inset": inset || 4,
          width,
        } as React.CSSProperties
      }
    />
  );
}
export default GradientCircle;
