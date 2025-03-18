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
    const response = await fetch(`${url}/uploadCropedMedias`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      toast.error("Something went wrong ! Please tyr again ..");
      setStep({ action: "previous", step: "crop" });
      return;
    }

    const { status, medias } = await response.json();

    if (status === "error") {
      toast.error("Something went wrong ! Please tyr again ..");
      setStep({ action: "previous", step: "crop" });
      return;
    }

    setCloudinaryMedias((prev) => ({ ...prev, medias }));
  } catch (error) {
    setStep({ action: "previous", step: "crop" });
    console.log(error);
  } finally {
    setCloudinaryMedias((prev) => ({ ...prev, isLoading: false }));
  }
};
