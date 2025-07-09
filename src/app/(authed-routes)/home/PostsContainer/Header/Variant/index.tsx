import Desktop from "./Desktop";
import { useAppSelector } from "@/store/hooks";
import Mobile from "./Mobile";

function Variant({ variant }: { variant: string | undefined }) {
  const { device } = useAppSelector((s) => s.modals);
  const isMobile = device.type === "mobile";

  return isMobile ? <Mobile variant={variant} /> : <Desktop />;
}
export default Variant;
