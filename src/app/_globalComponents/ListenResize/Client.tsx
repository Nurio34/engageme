import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DeviceType, setDevice } from "@/store/slices/modals";
import { useEffect, useState } from "react";

function ListenResizeClient() {
  const { device } = useAppSelector((s) => s.modals);
  const dispatch = useAppDispatch();
  const [deviceState, setDeviceState] = useState<DeviceType>(device);

  useEffect(() => {
    const handleResize = () => {
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;

      if (window.innerWidth <= 767) {
        setDeviceState(() => ({
          type: "mobile",
          width: innerWidth,
          height: innerHeight,
        }));
      } else if (window.innerWidth >= 1024) {
        setDeviceState(() => ({
          type: "desktop",
          width: innerWidth,
          height: innerHeight,
        }));
      } else {
        setDeviceState(() => ({
          type: "tablet",
          width: innerWidth,
          height: innerHeight,
        }));
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(setDevice(deviceState));
  }, [dispatch, deviceState]);

  return <div hidden />;
}
export default ListenResizeClient;
