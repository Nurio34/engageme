import Desktop from "./Desktop";
import { useAppSelector } from "@/store/hooks";
import Mobile from "./Mobile";

function Variant() {
  const { device } = useAppSelector((s) => s.modals);
  const isMobile = device.type === "mobile";

  return isMobile ? <Mobile /> : <Desktop />;
}
export default Variant;
