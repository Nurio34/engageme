import Chevron from "@/app/_globalComponents/Svg/Chevron";
import { useEffect, useRef, useState } from "react";
import CountsSettings from "./CountsSettings";
import CommentsSettings from "./CommentsSettings";

function AdvancedSettings() {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const chevronRotate = isTabOpen ? 0 : 180;

  const ContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (!ContainerRef.current) return;

    setContainerHeight(ContainerRef.current!.scrollHeight);
  }, [isTabOpen]);

  return (
    <div className="px-4 py-2 border-b-2">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsTabOpen((prev) => !prev)}
      >
        <p className={`${isTabOpen ? "font-semibold" : ""}`}>
          Advanced Settings
        </p>
        <Chevron rotate={chevronRotate} />
      </div>
      <div
        ref={ContainerRef}
        className="overflow-hidden transition-all duration-500"
        style={{
          height: isTabOpen ? containerHeight : 0,
        }}
      >
        <CountsSettings />
        <CommentsSettings />
      </div>
    </div>
  );
}
export default AdvancedSettings;
