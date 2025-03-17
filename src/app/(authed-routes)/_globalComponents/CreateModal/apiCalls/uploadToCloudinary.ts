import { Dispatch, SetStateAction } from "react";
import { CloudinaryMediasType, StepType } from "../Context";
import toast from "react-hot-toast";

export const uploadToCloudinary = async (
  formData: FormData,
  setCloudinaryMedias: Dispatch<SetStateAction<CloudinaryMediasType>>,
  setStep: Dispatch<SetStateAction<StepType>>
) => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  setCloudinaryMedias((prev) => ({ ...prev, isLoading: true }));

  try {
    const response = await fetch(`${url}/uploadMedias`, {
      method: "POST",
      body: formData,
    });

    const { status, medias } = await response.json();

    setCloudinaryMedias((prev) => ({ ...prev, medias }));
  } catch (error) {
    setStep({ action: "previous", step: "crop" });
    console.log(error);
  } finally {
    setCloudinaryMedias((prev) => ({ ...prev, isLoading: false }));
  }
};
