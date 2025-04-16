import { Dispatch, SetStateAction, useEffect } from "react";
import { CloudinaryMediasType } from "../Context";

export const useInitialProcess = (
  cloudinaryMedias: CloudinaryMediasType,
  setCloudinaryMedias: Dispatch<SetStateAction<CloudinaryMediasType>>
) => {
  useEffect(() => {
    const fetchAndProcessMedias = async () => {
      if (cloudinaryMedias.medias.length === 0) return;

      const urlToFile = async (url: string): Promise<Blob> => {
        while (true) {
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch media");
            return await response.blob();
          } catch (error) {
            console.error(`Error fetching media, retrying...`, error);
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        }
      };

      const updatedCloudinaryMedias = await Promise.all(
        cloudinaryMedias.medias.map(async (mediaObj) => {
          if (mediaObj.resource_type === "image") {
            const blob = await urlToFile(mediaObj.eager![0].secure_url);
            return { ...mediaObj, blob };
          } else {
            const blob = await urlToFile(mediaObj.secure_url);

            const eagerUrl = mediaObj.eager![0].secure_url;
            const {
              c: crop,
              w: width,
              h: height,
              x,
              y,
            } = Object.fromEntries(
              eagerUrl
                .split("/")[6]
                .split(",")
                .map((item) => item.split("_"))
            );
            const transformations = { crop, width, height, x, y };
            return { ...mediaObj, blob, transformations };
          }
        })
      );

      setCloudinaryMedias((prev) => ({
        ...prev,
        isInitialProcessComplated: true,
        medias: updatedCloudinaryMedias,
      }));
    };

    if (!cloudinaryMedias.isInitialProcessComplated) fetchAndProcessMedias();
  }, [cloudinaryMedias]);
};
