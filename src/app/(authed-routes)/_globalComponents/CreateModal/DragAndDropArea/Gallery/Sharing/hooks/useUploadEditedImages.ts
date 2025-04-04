import { useEffect, useRef, useState } from "react";
import { EditedMedia, useCreateModalContext } from "../../../../Context";
import toast from "react-hot-toast";

export type UpdatedImageType = {
  publicId: string;
  url: string;
  width: number;
  height: number;
};

export const useUploadEditedImages = (editedMedias: EditedMedia[]) => {
  const { goPrevStep } = useCreateModalContext();
  const [updatedImages, setUpdatedImages] = useState<UpdatedImageType[]>([]);
  const [isComplated, setIsComplated] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasUploaded = useRef(false); // Prevents duplicate uploads

  useEffect(() => {
    if (hasUploaded.current) return; // Prevents re-execution
    hasUploaded.current = true;

    const uploadEditedMedia = async (media: EditedMedia) => {
      const url = process.env.NEXT_PUBLIC_SERVER_URL;
      const { blob, publicId } = media;

      const formData = new FormData();
      formData.append("file", blob);
      formData.append("publicId", publicId);

      try {
        const response = await fetch(`${url}/uploadEditedMedia`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("uploadEditedMedia() error", error);
        return { status: "error" };
      }
    };

    const uploadEditedMedias = async (retry = 3) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      try {
        const results = await Promise.all(
          editedMedias
            .filter((media) => media.type === "image")
            .map((media) => uploadEditedMedia(media))
        );

        const isAnyError = results.some((result) => result.status === "error");

        if (isAnyError && retry > 0) {
          timeoutRef.current = setTimeout(
            () => uploadEditedMedias(retry - 1),
            1000
          );
          return;
        }

        if (isAnyError) {
          toast.error("Something went wrong! Please try again.");
          goPrevStep();
        } else {
          setUpdatedImages(results.map((result) => result.media));
          setIsComplated(true);
          console.log("uploadEditedMedias() success");
        }
      } catch (error) {
        console.log("uploadEditedMedias() error", error);
        toast.error("Unexpected error! Please try again.");
        goPrevStep();
      }
    };

    uploadEditedMedias();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [editedMedias]);

  return { updatedImages, isComplated };
};
