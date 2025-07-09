import { useAppSelector } from "@/store/hooks";
import "./index.css";

function GradientBar() {
  const { isCreateModalOpen } = useAppSelector((s) => s.modals);

  return (
    <div
      className={`GradientBar z-50 w-full h-1
    ${isCreateModalOpen ? "absolute" : "fixed"}  
  `}
    />
  );
}
export default GradientBar;
