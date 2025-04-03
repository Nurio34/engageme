import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleIsMobile } from "@/store/slices/modals";
import { useEffect } from "react";

function ListenResizeClient() {
  const { isMobile } = useAppSelector((s) => s.modals);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMobile) {
        dispatch(toggleIsMobile(false));
      }
      if (window.innerWidth <= 1023 && !isMobile) {
        dispatch(toggleIsMobile(true));
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return <div hidden />;
}
export default ListenResizeClient;
