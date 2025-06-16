import { usePostContext } from "@/app/(authed-routes)/post/[postId]/Context";
import Chevron from "@/app/_globalComponents/Svg/Chevron";

function NextMediaButton() {
  const { setMediaIndex, MediasRef, containerWidth, mediaIndex } =
    usePostContext();

  return (
    MediasRef.current.length > 1 &&
    mediaIndex < MediasRef.current.length - 1 && (
      <button
        type="button"
        className={`absolute z-10 top-1/2 right-4 -translate-y-1/2 rounded-full bg-base-100
          w-6 aspect-square flex justify-center items-center
          ${!containerWidth ? "opacity-0" : "opacity-100"}
        `}
        onClick={() =>
          setMediaIndex((prev) =>
            prev >= MediasRef.current.length - 1
              ? MediasRef.current.length - 1
              : prev + 1
          )
        }
      >
        <Chevron rotate={90} />
      </button>
    )
  );
}
export default NextMediaButton;
