import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

function RecomendationsClient() {
  const { device } = useAppSelector((s) => s.modals);
  const { type } = device;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (type === "desktop") setIsMounted(true);
    else setIsMounted(false);
  }, [type]);

  return isMounted && <aside>RecomendationsClient</aside>;
}
export default RecomendationsClient;
