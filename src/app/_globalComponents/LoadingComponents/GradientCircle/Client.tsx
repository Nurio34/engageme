import { useAppSelector } from "@/store/hooks";
import "./index.css";

function Client({
  isLoading,
  width,
  inset,
}: {
  isLoading?: boolean;
  width?: number;
  inset?: number;
}) {
  const animationState = isLoading ? "running" : "paused";

  const { theme } = useAppSelector((s) => s.modals);

  return (
    <div
      className="GradientCircle w-24 aspect-square rounded-full"
      style={
        {
          "--animationState": animationState,
          "--inset": inset || 4,
          "--bg": theme === "light" ? "rgb(255,255,255)" : "rgb(29,35,42)",
          width,
        } as React.CSSProperties
      }
    />
  );
}
export default Client;
