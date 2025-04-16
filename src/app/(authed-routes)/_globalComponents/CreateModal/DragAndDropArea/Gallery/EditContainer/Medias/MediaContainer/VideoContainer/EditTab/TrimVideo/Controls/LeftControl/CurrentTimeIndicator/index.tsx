import { ControlsType } from "@/app/(authed-routes)/_globalComponents/CreateModal/_hooks/useVideoTrimControls";
import { PlayerTimeType } from "../../../../..";

function CurrentTimeIndicator({
  playerTime,
  control,
}: {
  playerTime: PlayerTimeType;
  control: ControlsType;
}) {
  const { currentTime, duration } = playerTime;
  const { collapseControl, leftControl } = control;
  const { containerWidth, leftPosition, rightPosition } = collapseControl;
  const { width } = leftControl;

  if (!Boolean(containerWidth) || !Boolean(currentTime) || !Boolean(duration))
    return;

  const indicatorAreaWidth = containerWidth - leftPosition - rightPosition;
  const parameter = +(indicatorAreaWidth / duration).toFixed(2);
  const indicatorPosition = +(
    width +
    +currentTime.toFixed(2) * parameter
  ).toFixed(2);

  return (
    Boolean(playerTime) && (
      <span
        className="absolute w-[6px] bg-base-100 rounded-lg transition-all"
        style={{
          height: "calc(100% + 20px)",
          left: indicatorPosition,
          boxShadow: "0 0 9px black",
        }}
      />
    )
  );
}

export default CurrentTimeIndicator;
