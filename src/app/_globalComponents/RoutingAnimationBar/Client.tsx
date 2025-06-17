"use client";

import { useEffect } from "react";
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
  }, [pathname, searchParams, dispatch]);

  return isRouting && <GradientBar />;
}

export default Client;
