import { usePostContext } from "@/app/(authed-routes)/post/[postId]/Context";
import Chevron from "@/app/_globalComponents/Svg/Chevron";

function PreviousMediaButton() {
  const { setMediaIndex, containerWidth, mediaIndex } = usePostContext();

  return (
    mediaIndex > 0 && (
      <button
        type="button"
        className={`absolute z-10 top-1/2 left-4 -translate-y-1/2 rounded-full bg-base-100
            w-6 aspect-square flex justify-center items-center
            ${!containerWidth ? "opacity-0" : "opacity-100"}
        `}
        onClick={() => setMediaIndex((prev) => (prev <= 0 ? prev : prev - 1))}
      >
        <Chevron rotate={270} />
      </button>
    )
  );
}
export default PreviousMediaButton;
