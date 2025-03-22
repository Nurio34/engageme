import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { PosterType } from "@/actions/cloudinary";

export const uploadPosterImageCloudinary = async (
  file: File,
  setPoster: Dispatch<SetStateAction<PosterType | undefined>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  const formData = new FormData();
  formData.append("file", file);

  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  try {
    setIsLoading(true);

    const response = await fetch(`${url}/uploadPosterImage`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      toast.error("Response not OK. Retry !");
      return;
    }

    const data = await response.json();

    if (data.status === "error") {
      toast.error("Something went wrong. Retry !");
      return;
    }

    const poster: PosterType = data.media;
    setPoster(poster);
  } catch (error) {
    console.log(error);
    toast.error("Unexpected server error. Retry !");
  } finally {
    setIsLoading(false);
  }
};
