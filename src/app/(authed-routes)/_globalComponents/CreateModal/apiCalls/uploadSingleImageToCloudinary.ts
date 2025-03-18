import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { CloudinaryMediasType } from "../Context";

export const uploadSingleImageToCloudinary = async (
  file: File,
  asset_id: string,
  setState: Dispatch<SetStateAction<CloudinaryMediasType>>
) => {
  const formData = new FormData();
  formData.append("file", file);

  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  try {
    const response = await fetch(`${url}/uploadSingleImage`, {
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

    const media: string = data.media;
    if (setState)
      setState((prev) => {
        const medias = prev.medias;
        const updatedMedias = medias.map((mediaObj) => {
          if (mediaObj.asset_id === asset_id) {
            return { ...mediaObj, poster: `${media}.jpg` };
          }
          return mediaObj;
        });

        return { ...prev, medias: updatedMedias };
      });
  } catch (error) {
    console.log(error);
    toast.error("Unexpected server error. Retry !");
  }
};
