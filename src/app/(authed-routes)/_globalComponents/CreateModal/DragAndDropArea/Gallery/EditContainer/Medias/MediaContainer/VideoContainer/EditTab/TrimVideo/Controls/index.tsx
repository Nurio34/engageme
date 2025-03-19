import { useEffect, useRef, useState } from "react";
import LeftControl from "./LeftControl";
import RightControl from "./RightControl";
import LeftArea from "./LeftArea";
import RightArea from "./RightArea";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import {
  CollapseControlType,
  ControlsType,
  defaultCollapseControl,
  defaultLeftControl,
  defaultRightControl,
  LeftControlType,
  RightControlType,
} from "@/app/(authed-routes)/_globalComponents/CreateModal/hooks/useVideoTrimControls";

export type CursorType = { start: number; end: number };

function Controls({
  url,
  duration,
  asset_id,
}: {
  url: string;
  duration: number | undefined;
  asset_id: string;
}) {
  const { setCloudinaryMedias, controls, setControls } =
    useCreateModalContext();

  const control = controls.find((control) => control.assetId === asset_id) || {
    leftControl: defaultLeftControl,
    rightControl: defaultRightControl,
    collapseControl: defaultCollapseControl,
  };

  const [cursor, setCursor] = useState<CursorType>({ start: 0, end: 0 });
  const [leftControl, setLeftControl] = useState<LeftControlType>(
    control.leftControl || defaultLeftControl
  );
  const [rightControl, setRightControl] = useState<RightControlType>(
    control.rightControl || defaultRightControl
  );
  const ControlsContainerRef = useRef<HTMLDivElement | null>(null);
  const [collapseControl, setCollapseControl] = useState<CollapseControlType>(
    control.collapseControl || defaultCollapseControl
  );

  useEffect(() => {
    if (ControlsContainerRef.current) {
      const width = Math.round(
        ControlsContainerRef.current.getBoundingClientRect().width
      );
      setCollapseControl((prev) => ({ ...prev, containerWidth: width }));
    }
  }, []);

  useEffect(() => {
    if (leftControl.isThisDragging || rightControl.isThisDragging) return;
    if (!duration || !collapseControl.containerWidth) return;

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

    const updatedDuration = +(endTime - startTime).toFixed(2);

    const updatedUrl = url.replace(
      /\/video\/upload\/(so_[^,]+,du_[^/]+\/)?/, // Match existing `so_` and `du_` if they exist
      `/video/upload/so_${startTime},du_${updatedDuration}/` // Replace or insert transformation
    );

    setCloudinaryMedias((prev) => {
      const medias = prev.medias;
      const updatedMedias = medias.map((mediaObj) => {
        if (mediaObj.asset_id === asset_id) {
          return { ...mediaObj, url: updatedUrl };
        }
        return mediaObj;
      });

      return { ...prev, medias: updatedMedias };
    });
  }, [
    leftControl.isThisDragging,
    rightControl.isThisDragging,
    duration,
    collapseControl.containerWidth,
  ]);

  useEffect(() => {
    const updatedControls: ControlsType[] = controls.map((control) => {
      if (control.assetId === asset_id) {
        return { ...control, leftControl, rightControl, collapseControl };
      }
      return control;
    });

    setControls(updatedControls);
  }, [leftControl, rightControl, collapseControl]);

  return (
    <div
      ref={ControlsContainerRef}
      className="absolute top-0 left-0 w-full h-full rounded-lg"
    >
      <LeftArea leftControl={leftControl} />
      <LeftControl
        cursor={cursor}
        setCursor={setCursor}
        leftControl={leftControl}
        setLeftControl={setLeftControl}
        collapseControl={collapseControl}
        setCollapseControl={setCollapseControl}
      />
      <RightControl
        cursor={cursor}
        setCursor={setCursor}
        rightControl={rightControl}
        setRightControl={setRightControl}
        collapseControl={collapseControl}
        setCollapseControl={setCollapseControl}
      />
      <RightArea rightControl={rightControl} />
    </div>
  );
}
export default Controls;
