import Chevron from "@/app/_globalComponents/Svg/Chevron";
import { useRecomendationsContext } from "../Context";
import { useAppSelector } from "@/store/hooks";

function PreviousButton() {
  const { device } = useAppSelector((s) => s.modals);
  const { type } = device;

  const { index, setIndex } = useRecomendationsContext();

  return (
    type === "desktop" &&
    index > 0 && (
      <button
        type="button"
        className="absolute z-10 top-1/2 left-2 -translate-y-1/2 w-6 aspect-square rounded-full bg-base-content/50
        flex justify-center items-center text-base-100
      "
        onClick={() => setIndex((prev) => (prev > 0 ? prev - 1 : prev))}
      >
        <Chevron rotate={270} size={3} />
      </button>
    )
  );
}
export default PreviousButton;
