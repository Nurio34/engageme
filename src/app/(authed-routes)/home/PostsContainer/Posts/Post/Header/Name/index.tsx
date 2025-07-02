import UserModal from "@/app/(authed-routes)/_globalComponents/UserModal";
import { observeVisibility } from "@/utils/observeVisibility";
import { useEffect, useRef, useState } from "react";

function Name({ name, userId }: { name: string; userId: string }) {
  const { containerRef, isVisible } = observeVisibility();
  // console.log({ containerRef, isVisible });

  return (
    <div
      className="relative"
      ref={containerRef}
      onMouseEnter={(e) => console.log(e)}
    >
      <p className="font-semibold cursor-pointer">{name}</p>
      {isVisible && <UserModal userId={userId} />}
    </div>
  );
}
export default Name;
