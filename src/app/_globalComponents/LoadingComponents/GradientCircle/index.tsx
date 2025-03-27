import "./index.css";

function GradientCircle({ isLoading }: { isLoading: boolean }) {
  const animationState = isLoading ? "running" : "paused";

  return (
    <div
      className="GradientCircle w-24 aspect-square rounded-full"
      style={{ "--animationState": animationState } as React.CSSProperties}
    />
  );
}
export default GradientCircle;
