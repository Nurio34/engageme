import { useEffect, useState } from "react";
import { CloudinaryMediasType } from "../Context";

export type LeftControlType = {
  base: number;
  left: number;
  isThisDragging: boolean;
  width: number;
};

export type RightControlType = {
  base: number;
  right: number;
  isThisDragging: boolean;
  width: number;
};

export type CollapseControlType = {
  containerWidth: number;
  leftPosition: number;
  rightPosition: number;
};

export type ControlsType = {
  assetId: string;
  leftControl: LeftControlType;
  rightControl: RightControlType;
  collapseControl: CollapseControlType;
};

export const defaultLeftControl = {
  base: 0,
  left: 0,
  isThisDragging: false,
  width: 10,
};

export const defaultRightControl = {
  base: 0,
  right: 0,
  isThisDragging: false,
  width: 10,
};

export const defaultCollapseControl = {
  containerWidth: 0,
  leftPosition: defaultLeftControl.width,
  rightPosition: defaultRightControl.width,
};

export const useVideoTrimControls = (
  cloudinaryMedias: CloudinaryMediasType
) => {
  const [controls, setControls] = useState<ControlsType[]>([]);

  useEffect(() => {
    if (cloudinaryMedias.medias.length === 0) {
      setControls([]);
      return;
    }

    setControls((prev) => {
      const newControls = [...prev];

      cloudinaryMedias.medias.forEach((mediaObj) => {
        if (!mediaObj.duration) return;

        // Check if assetId already exists
        const exists = newControls.some(
          (control) => control.assetId === mediaObj.asset_id
        );
        if (!exists) {
          newControls.push({
            assetId: mediaObj.asset_id,
            leftControl: defaultLeftControl,
            rightControl: defaultRightControl,
            collapseControl: defaultCollapseControl,
          });
        }
      });

      return newControls;
    });
  }, [cloudinaryMedias]);

  return { controls, setControls };
};
