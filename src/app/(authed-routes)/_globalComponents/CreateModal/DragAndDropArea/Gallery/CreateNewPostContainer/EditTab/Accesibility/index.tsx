import Chevron from "@/app/_globalComponents/Svg/Chevron";
import { useState } from "react";

function Accesibility() {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const chevronRotate = isTabOpen ? 0 : 180;
  console.log(chevronRotate);

  return (
    <div className="px-4 py-2">
      <div
        className="flex items-center justify-between"
        onClick={() => setIsTabOpen((prev) => !prev)}
      >
        <p className={`${isTabOpen ? "font-semibold" : ""}`}>Accesibility</p>
        <Chevron rotate={chevronRotate} />
      </div>
      <div
        className="overflow-hidden transition-all origin-top"
        style={{
          transform: isTabOpen ? "scaleY(1)" : "scaleY(0)",
          opacity: isTabOpen ? 1 : 0,
        }}
      >
        <p className="py-2 text-xs text-base-content/70">
          Alt text describes your photos for people with visual impairments. Alt
          text will be automatically created for your photos or you can choose
          to write your own.
        </p>
      </div>
    </div>
  );
}
export default Accesibility;
