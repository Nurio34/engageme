import { Dispatch, SetStateAction, useEffect } from "react";
import { UpdatedImageType } from "./useUploadEditedImages";
import { AltTextType, EditedMedia } from "../../../../Context";
import { UpdatedMedia } from "..";

export const useUpdateMedias = (
  updatedImages: UpdatedImageType[],
  isComplated: boolean,
  editedMedias: EditedMedia[],
  setUpdatedMediasState: Dispatch<SetStateAction<UpdatedMedia[]>>,
  altTexts: AltTextType[],
  updatedMediasState: UpdatedMedia[]
) => {
  useEffect(() => {
    if (updatedMediasState.length > 0 || !isComplated) return;

    const updatedMedias: UpdatedMedia[] = editedMedias.map((mediaObj) => {
      const { publicId, url, type, poster, transformation, isAudioAllowed } =
        mediaObj;

      const updatedImage = updatedImages.find(
        (updatedImage) => updatedImage.publicId === mediaObj.publicId
      );

      if (updatedImage)
        return {
          publicId,
          url: updatedImage.url,
          type,
          altText: altTexts.find((altObj) => altObj.publicId === publicId)
            ?.altText,
        };
      return { publicId, url, type, poster, transformation, isAudioAllowed };
    });
    setUpdatedMediasState(updatedMedias);
    console.log("useUpdateMedias() success");
  }, [updatedImages, isComplated]);
};
