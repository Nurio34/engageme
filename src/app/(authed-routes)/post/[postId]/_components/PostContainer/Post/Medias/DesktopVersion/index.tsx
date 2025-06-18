import { usePostContext } from "@/app/(authed-routes)/post/[postId]/Context";
import { PrismaMediaType } from "../../../../../../../../../../prisma/types/post";
import Media from "./Media";
import NextMediaButton from "./NextMediaButton";
import PreviousMediaButton from "./PreviousMediaButton";
import SlideIndicator from "@/app/(authed-routes)/home/PostsContainer/Posts/Post/Medias/SlideButtons/SlideIndicator";

function DesktopVersion({ medias }: { medias: PrismaMediaType[] }) {
  const { containerWidth, UlRef, mediaIndex } = usePostContext();

  return (
    <div className="relative overflow-hidden">
      <PreviousMediaButton />
      <ul
        ref={UlRef}
        className={`h-full flex transition-all duration-500
        ${!containerWidth ? "opacity-0" : "opacity-100"}  
      `}
        style={{ maxWidth: containerWidth }}
      >
        {medias.map((media, index) => (
          <Media key={media.id} index={index} media={media} />
        ))}
      </ul>
      <NextMediaButton totalMedias={medias.length} />
      <SlideIndicator medias={medias} currentIndex={mediaIndex} />
    </div>
  );
}
export default DesktopVersion;
