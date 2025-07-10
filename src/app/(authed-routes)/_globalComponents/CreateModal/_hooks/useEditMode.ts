import { Dispatch, SetStateAction, useEffect } from "react";
import {
  AltTextType,
  EditedMedia,
  LocationType,
  SettingsType,
  StepType,
} from "../Context";
import { useAppSelector } from "@/store/hooks";

export const useEditMode = (
  setEditedMedias: Dispatch<SetStateAction<EditedMedia[]>>,
  setMessage: Dispatch<SetStateAction<string>>,
  setLocation: Dispatch<SetStateAction<LocationType>>,
  setSettings: Dispatch<SetStateAction<SettingsType>>,
  setAltTexts: Dispatch<SetStateAction<AltTextType[]>>,
  setStep: Dispatch<SetStateAction<StepType>>
) => {
  const { isEditing, mediasToEdit, message, location, settings } =
    useAppSelector((s) => s.postEdit);

  useEffect(() => {
    // if (mediasToEdit.length === 0) return;
    setEditedMedias(mediasToEdit);
    setMessage(message);
    setLocation(location);
    setSettings(settings);

    const imageMedias = mediasToEdit.filter((media) => media.type === "image");
    setAltTexts(
      imageMedias.map((media) => ({
        publicId: media.publicId,
        altText: media.altText || "",
      }))
    );

    if (isEditing) setStep({ action: "next", step: "post" });
  }, [isEditing, mediasToEdit]);
};
