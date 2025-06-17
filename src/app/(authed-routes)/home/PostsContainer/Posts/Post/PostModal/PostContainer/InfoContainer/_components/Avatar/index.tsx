import GradientCircle from "@/app/_globalComponents/LoadingComponents/GradientCircle";
import Image from "next/image";
import { useInfoContext } from "../../Context";

function Avatar() {
  const { postsState } = useInfoContext();
  if (postsState.length <= 0) return;
  const { user } = postsState[0];
  const { avatar } = user;

  return (
    <div className="relative cursor-pointer">
      <GradientCircle width={44} inset={2} />
      <figure
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-9 aspect-square rounded-full overflow-hidden
        "
      >
        <Image
          src={avatar || "/placeholders/avatar.webp"}
          alt="avatar"
          fill
          sizes="(min-width=1024) 100vw,50vw "
        />
      </figure>
    </div>
  );
}
export default Avatar;
