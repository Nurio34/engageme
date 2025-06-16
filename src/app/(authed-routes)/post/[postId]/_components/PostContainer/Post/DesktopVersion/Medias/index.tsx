import Media from "./Media";
import PreviousMediaButton from "./PreviousMediaButton";
import NextMediaButton from "./NextMediaButton";
import { PrismaMediaType } from "../../../../../../../../../../prisma/types/post";
import { usePostContext } from "@/app/(authed-routes)/post/[postId]/Context";
import MutedAudioIcon from "@/app/_globalComponents/Svg/MutedAudioIcon";

function Medias({ medias }: { medias: PrismaMediaType[] }) {
  const { containerWidth } = usePostContext();

  return (
    <div className="relative">
      <PreviousMediaButton />
      <ul
        className={`h-full overflow-hidden flex
        ${!containerWidth ? "opacity-0" : "opacity-100"}  
      `}
        style={{ maxWidth: containerWidth }}
      >
        {medias.map((media, index) => (
          <Media key={media.id} index={index} media={media} />
        ))}
      </ul>
      <NextMediaButton />
    </div>
  );
}
export default Medias;
