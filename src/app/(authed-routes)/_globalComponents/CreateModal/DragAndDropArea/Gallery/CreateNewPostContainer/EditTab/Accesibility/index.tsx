import Chevron from "@/app/_globalComponents/Svg/Chevron";
import { useEffect, useRef, useState } from "react";
import Description from "./Description";
import Images from "./Images";

function Accesibility() {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const chevronRotate = isTabOpen ? 0 : 180;

  const ContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (!ContainerRef.current) return;

    setContainerHeight(ContainerRef.current!.scrollHeight);
  }, [isTabOpen]);

  return (
    <div className="px-4 py-2">
      <button
        type="button"
        className="w-full flex items-center justify-between"
        onClick={() => setIsTabOpen((prev) => !prev)}
      >
        <p className={`${isTabOpen ? "font-semibold" : ""}`}>Accesibility</p>
        <Chevron rotate={chevronRotate} />
      </button>
      <div
        ref={ContainerRef}
        className="overflow-hidden transition-all duration-500"
        style={{
          height: isTabOpen ? containerHeight : 0,
        }}
      >
        <Description />
        <Images />
      </div>
    </div>
  );
}

export default Accesibility;
