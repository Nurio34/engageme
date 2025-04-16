import {
  CollapseControlType,
  LeftControlType,
  RightControlType,
} from "@/app/(authed-routes)/_globalComponents/CreateModal/_hooks/useVideoTrimControls";

export const getControlTimes = (
  duration: number,
  collapseControl: CollapseControlType,
  leftControl: LeftControlType,
  rightControl: RightControlType
) => {
  const durationTrack = +duration.toFixed(2);

  const startTimeTrack = +(
    duration /
    (collapseControl.containerWidth / (leftControl.base + leftControl.left))
  ).toFixed(2);
  const startTime = startTimeTrack < 0 ? 0 : startTimeTrack;

  const endTimeTrack = +(
    duration -
    duration /
      (collapseControl.containerWidth /
        (rightControl.base + rightControl.right))
  ).toFixed(2);
  const endTime = endTimeTrack > durationTrack ? durationTrack : endTimeTrack;

  return { startTime, endTime };
};
