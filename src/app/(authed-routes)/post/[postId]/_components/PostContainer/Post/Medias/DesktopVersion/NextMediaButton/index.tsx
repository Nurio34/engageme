import { usePostContext } from "@/app/(authed-routes)/post/[postId]/_components/PostContainer/Context";
import Chevron from "@/app/_globalComponents/Svg/Chevron";

function NextMediaButton({ totalMedias }: { totalMedias: number }) {
  const { setMediaIndex, containerWidth, mediaIndex } = usePostContext();

  return (
    mediaIndex < totalMedias - 1 && (
      <button
        type="button"
        className={`absolute z-10 top-1/2 right-4 -translate-y-1/2 rounded-full bg-base-100
          w-6 aspect-square flex justify-center items-center
          ${!containerWidth ? "opacity-0" : "opacity-100"}
        `}
        onClick={() =>
          setMediaIndex((prev) =>
            prev >= totalMedias - 1 ? totalMedias - 1 : prev + 1
          )
        }
      >
        <Chevron rotate={90} />
      </button>
    )
  );
}
export default NextMediaButton;
