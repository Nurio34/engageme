import { Dispatch, SetStateAction } from "react";
import { CloudinaryMediasType } from "../Context";
import { DeleteMediaType } from "@/actions/cloudinary";

export const deleteFromCloudinary = async (
  publicIds: DeleteMediaType[],
  setCloudinaryMedias?: Dispatch<SetStateAction<CloudinaryMediasType>>,
  retryCount = 0, // track retry count
  maxRetries = 3 // limit to 3 retries
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
      if (retryCount < maxRetries) {
        setTimeout(() => {
          deleteFromCloudinary(publicIds, setCloudinaryMedias, retryCount + 1);
        }, 1000);
      } else {
        console.error("Reached max retry attempts for deleteFromCloudinary");
      }
      return;
    }

    if (setCloudinaryMedias)
      setCloudinaryMedias((prev) => ({ ...prev, medias: [] }));
  } catch (error) {
    console.error("Unexpected error while deleteFromCloudinary:", error);
    if (retryCount < maxRetries) {
      setTimeout(() => {
        deleteFromCloudinary(publicIds, setCloudinaryMedias, retryCount + 1);
      }, 1000);
    } else {
      console.error(
        "Reached max retry attempts due to network or server error."
      );
    }
  } finally {
    if (setCloudinaryMedias)
      setCloudinaryMedias((prev) => ({
        ...prev,
        isLoading: false,
        isInitialProcessComplated: false,
      }));
  }
};
