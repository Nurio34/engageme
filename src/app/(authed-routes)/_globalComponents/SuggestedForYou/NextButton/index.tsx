import Chevron from "@/app/_globalComponents/Svg/Chevron";
import { useRecomendationsContext } from "../Context";
import { useAppSelector } from "@/store/hooks";

function NextButton() {
  const { device } = useAppSelector((s) => s.modals);
  const { type } = device;

  const { setIndex, index, isLast } = useRecomendationsContext();

  return (
    type === "desktop" &&
    index !== isLast && (
      <button
        type="button"
        className="absolute top-1/2 right-0 -translate-y-1/2 w-6 aspect-square rounded-full bg-base-content/50
        flex justify-center items-center text-base-100
      "
        onClick={() => setIndex((prev) => prev + 1)}
      >
        <Chevron rotate={90} size={3} />
      </button>
    )
  );
}
export default NextButton;
