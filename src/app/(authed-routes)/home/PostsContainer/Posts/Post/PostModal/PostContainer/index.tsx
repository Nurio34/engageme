import { PrismaPostType } from "../../../../../../../../../prisma/types/post";
import MediaContainer from "./MediaContainer";
import InfoContainer from "./InfoContainer";
import { useAppSelector } from "@/store/hooks";

function PostContainer({ post }: { post: PrismaPostType }) {
  const { medias } = post;
  const aspectRatio =
    medias[0].width && medias[0].height
      ? medias[0].width / medias[0].height
      : medias[0].transformation &&
        +medias[0].transformation.width / +medias[0].transformation.height;

  const { device } = useAppSelector((s) => s.modals);
  const isDesktop = device.type === "desktop";

  return (
    <div
      className="flex flex-col lg:flex-row bg-base-100 
        min-w-full lg:min-w-0 
      "
      style={{
        height: isDesktop ? "calc(100% - 64px)" : undefined,
        aspectRatio: isDesktop ? undefined : aspectRatio!,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <MediaContainer medias={medias} />
      <InfoContainer post={post} />
    </div>
  );
}
export default PostContainer;
