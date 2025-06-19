"use client";

import Link from "next/link";
import { useState } from "react";

function GuestLink() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/home"
      className="block col-span-full justify-self-center self-start space-y-1 px-[10vw] md:py-0 text-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      prefetch
    >
      <p className="text-sm font-semibold text-primary">
        Click here to continue without signing in, Browse as a guest
      </p>
      <div
        className={` border-b border-primary origin-left transition-transform duration-500 ${
          isHovered ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </Link>
  );
}
export default GuestLink;
