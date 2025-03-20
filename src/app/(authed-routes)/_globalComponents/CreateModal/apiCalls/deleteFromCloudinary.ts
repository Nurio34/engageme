import { Dispatch, SetStateAction } from "react";
import { CloudinaryMediasType } from "../Context";
import { DeleteMediaType } from "@/actions/cloudinary";

export const deleteFromCloudinary = async (
  publicIds: DeleteMediaType[],
  setCloudinaryMedias?: Dispatch<SetStateAction<CloudinaryMediasType>>
) => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  if (setCloudinaryMedias)
    setCloudinaryMedias((prev) => ({ ...prev, isLoading: true }));

  try {
    const response = await fetch(`${url}/deleteMedias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(publicIds),
    });

    const { status } = await response.json();

    if (status === "error") {
      setTimeout(() => {
        deleteFromCloudinary(publicIds, setCloudinaryMedias);
      }, 1000);
      return;
    }
    if (setCloudinaryMedias)
      setCloudinaryMedias!((prev) => ({ ...prev, medias: [] }));
  } catch (error) {
    console.log(`Unexpected error while deleteFromCloudinary : `, error);
    setTimeout(() => {
      deleteFromCloudinary(publicIds, setCloudinaryMedias);
    }, 1000);
  } finally {
    if (setCloudinaryMedias)
      setCloudinaryMedias!((prev) => ({
        ...prev,
        isLoading: false,
        isInitialProcessComplated: false,
      }));
  }
};
