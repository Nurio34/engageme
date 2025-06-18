import { PrismaMediaType } from "../../../../../../../../../prisma/types/post";
import { useAppSelector } from "@/store/hooks";
import DesktopVersion from "./DesktopVersion";
import MobileVersion from "./MobileVersion";

function Medias({ medias }: { medias: PrismaMediaType[] }) {
  const { device } = useAppSelector((s) => s.modals);
  const { type } = device;
  return type === "desktop" ? (
    <DesktopVersion medias={medias} />
  ) : (
    <MobileVersion medias={medias} />
  );
}
export default Medias;
