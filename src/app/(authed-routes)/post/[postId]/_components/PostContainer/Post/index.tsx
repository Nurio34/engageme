import { useAppSelector } from "@/store/hooks";
import { PrismaPostType } from "../../../../../../../../prisma/types/post";
import DesktopVersion from "./DesktopVersion";

function Post({ post }: { post: PrismaPostType }) {
  const { device } = useAppSelector((s) => s.modals);
  const { type } = device;

  return type === "desktop" ? (
    <DesktopVersion post={post} />
  ) : (
    <div>Mobile version</div>
  );
}
export default Post;
