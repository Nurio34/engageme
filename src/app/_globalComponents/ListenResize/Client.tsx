import { useAppDispatch } from "@/store/hooks";
import { setDevice } from "@/store/slices/modals";
import { useEffect } from "react";

function ListenResizeClient() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        dispatch(setDevice("mobile"));
      } else if (window.innerWidth >= 1024) {
        dispatch(setDevice("desktop"));
      } else {
        dispatch(setDevice("tablet"));
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div hidden />;
}
export default ListenResizeClient;
