import { Dispatch, SetStateAction } from "react";
import { CloudinaryMediasType } from "../Context";
import toast from "react-hot-toast";

export const uploadToCloudinary = async (
  formData: FormData,
  setCloudinaryMedias: Dispatch<SetStateAction<CloudinaryMediasType>>
) => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  setCloudinaryMedias((prev) => ({ ...prev, isLoading: true }));

  try {
    const response = await fetch(`${url}/uploadMedias`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) return toast.error("Response not ok !");

    const { medias } = await response.json();

    setCloudinaryMedias((prev) => ({ ...prev, medias }));
  } catch (error) {
    toast.error("Unexpected error while uploadToCloudinary");
    console.log(`Unexpected error while uploadToCloudinary : `, error);
  } finally {
    setCloudinaryMedias((prev) => ({ ...prev, isLoading: false }));
  }
};
