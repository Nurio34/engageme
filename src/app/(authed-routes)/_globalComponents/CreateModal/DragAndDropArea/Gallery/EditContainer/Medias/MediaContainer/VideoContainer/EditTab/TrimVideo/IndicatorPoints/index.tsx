import { BsDot } from "react-icons/bs";

function IndicatorPoints({ duration }: { duration: number | undefined }) {
  const totalIndicator = 9;

  return (
    <div className="flex items-center justify-between">
      {Array(totalIndicator)
        .fill("#")
        .map((_, index) => (
          <div key={index} className={`relative`}>
            <BsDot
              className={`text-2xl font-bold  ${
                index % 4 === 0
                  ? "text-base-content/70"
                  : "text-base-content/20"
              }`}
            />
            {duration && index === 0 && (
              <div className="absolute text-base-content/50 text-sm left-1/2 -translate-x-1/2 -translate-y-2">
                0s
              </div>
            )}
            {duration && index === 4 && (
              <div className="absolute text-base-content/50 text-sm left-1/2 -translate-x-1/2 -translate-y-2">
                {Math.round(Math.round(duration) / 2)}s
              </div>
            )}
            {duration && index === 8 && (
              <div className="absolute text-base-content/50 text-sm left-1/2 -translate-x-1/2 -translate-y-2">
                {Math.round(duration)}s
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
export default IndicatorPoints;
