import { RefObject, useEffect } from "react";
import { CanvasType, CloudinaryMediasType } from "../Context";
import { useAppDispatch } from "@/store/hooks";
import { addCloudinaryMedias } from "@/store/slices/modals";

export const useGlobalCloudinaryMedias = (
  AllCanvases: RefObject<CanvasType[]>,
  cloudinaryMedias: CloudinaryMediasType
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    AllCanvases.current = [];

    if (cloudinaryMedias.medias.length) {
      const publicIds = cloudinaryMedias.medias.map((media) => ({
        publicId: media.public_id,
        type: media.resource_type as "image" | "video",
      }));

      dispatch(addCloudinaryMedias(publicIds));
    }
  }, [cloudinaryMedias]);
};
