import GradientCircle from "@/app/_globalComponents/LoadingComponents/GradientCircle";
import Image from "next/image";

function Avatar({ avatar }: { avatar: string | null }) {
  return (
    <div className="relative cursor-pointer">
      <GradientCircle isLoading={false} width={44} inset={2} />
      <figure
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-9 aspect-square rounded-full overflow-hidden
      "
      >
        <Image src={avatar || "/placeholders/avatar.webp"} alt="avatar" fill />
      </figure>
    </div>
  );
}
export default Avatar;
