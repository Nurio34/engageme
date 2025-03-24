import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import {
  CanvasType,
  CloudinaryMediasType,
  EditedMedia,
  FileObjectType,
  FilesType,
  GlobalTransformationType,
  StepType,
} from "../Context";
import { uploadToCloudinary } from "../apiCalls/uploadToCloudinary";
import { deleteFromCloudinary } from "../apiCalls/deleteFromCloudinary";
import { useAppSelector } from "@/store/hooks";
import { deletePosterImagesFromCloudinary } from "../apiCalls/deletePosterImageFromCloudinary";

export const useCloudinaryActions = (
  AllCanvases: RefObject<CanvasType[]>,
  files: FilesType,
  cloudinaryMedias: CloudinaryMediasType,
  setCloudinaryMedias: Dispatch<SetStateAction<CloudinaryMediasType>>,
  step: StepType,
  setStep: Dispatch<SetStateAction<StepType>>,
  setGlobalTransformations: Dispatch<
    SetStateAction<GlobalTransformationType[]>
  >,
  setEditedMedias: Dispatch<SetStateAction<EditedMedia[]>>
) => {
  const { posterImages } = useAppSelector((s) => s.modals);

  useEffect(() => {
    if (AllCanvases.current && AllCanvases.current.length) {
      const formData = new FormData();

      const filesArray: FileObjectType[] = AllCanvases.current.map((Canvas) => {
        return {
          File: files.files![Canvas.index],
          cloudinarySize: Canvas.cloudinarySize,
          originalSize: Canvas.originalSize,
          ratio: Canvas.ratio,
          scale: Canvas.scale,
          size: Canvas.size,
          position: Canvas.position,
        };
      });

      filesArray.forEach((fileObject) => {
        formData.append("files", fileObject.File);
        formData.append(
          "cloudinarySize",
          JSON.stringify(fileObject.cloudinarySize)
        );
        formData.append(
          "originalSize",
          JSON.stringify(fileObject.originalSize)
        );
        formData.append("ratio", JSON.stringify(fileObject.ratio));
        formData.append("scale", JSON.stringify(fileObject.scale));
        formData.append("size", JSON.stringify(fileObject.size));
        formData.append("position", JSON.stringify(fileObject.position));
      });

      uploadToCloudinary(formData, setCloudinaryMedias, setStep);
    }

    if (step.step === "crop" && cloudinaryMedias.medias.length > 0) {
      const publicIds = cloudinaryMedias.medias.map((media) => ({
        publicId: media.public_id,
        type: media.resource_type as "image" | "video",
      }));

      setGlobalTransformations([]);
      deletePosterImagesFromCloudinary(posterImages);
      deleteFromCloudinary(publicIds, setCloudinaryMedias);
    }

    if (step.step === "post") {
      const editedMedias: EditedMedia[] = cloudinaryMedias.medias.map(
        (mediaObj) => {
          const {
            blob,
            public_id,
            url,
            resource_type,
            transformations,
            audio,
            isAudioAllowed,
            poster,
          } = mediaObj;

          return {
            blob: blob!,
            publicId: public_id,
            url,
            type: resource_type as "image" | "video",
            transformation: transformations,
            audio,
            isAudioAllowed,
            posterUrl: poster?.url,
          };
        }
      );
      setEditedMedias(editedMedias);
    }
  }, [step]);
};
