import { PrismaMediaType } from "../../../../../../../../../prisma/types/post";
import { useAppSelector } from "@/store/hooks";
import DesktopVersion from "./DesktopVersion";

function Medias({ medias }: { medias: PrismaMediaType[] }) {
  const { device } = useAppSelector((s) => s.modals);
  const { type } = device;

  return type === "desktop" ? (
    <DesktopVersion medias={medias} />
  ) : (
    <div>Mobile Version</div>
  );
}
export default Medias;
