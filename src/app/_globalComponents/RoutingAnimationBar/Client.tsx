"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ended } from "@/store/slices/routing";
import GradientBar from "../LoadingComponents/GradientBar";

function Client() {
  const { isRouting } = useAppSelector((s) => s.routing);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ended());
  }, [pathname, searchParams]);

  return (
    isRouting && (
      // <div className={`fixed top-0 left-0 w-screen h-2 bg-red-500`} />
      <GradientBar />
    )
  );
}

export default Client;
