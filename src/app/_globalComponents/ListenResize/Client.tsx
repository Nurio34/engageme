import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDevice } from "@/store/slices/modals";
import { useEffect } from "react";

function ListenResizeClient() {
  const { device } = useAppSelector((s) => s.modals);
  const dispatch = useAppDispatch();
  console.log(device);

  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);

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
