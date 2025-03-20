import { Dispatch, SetStateAction, useEffect } from "react";
import { CloudinaryMediasType } from "../Context";

export const useInitialProcess = (
  cloudinaryMedias: CloudinaryMediasType,
  setCloudinaryMedias: Dispatch<SetStateAction<CloudinaryMediasType>>
) => {
  useEffect(() => {
    const fetchAndProcessMedias = async () => {
      if (cloudinaryMedias.medias.length === 0) return;

      const urlToFile = async (imageUrl: string) => {
        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          return blob;
        } catch (error) {
          console.log(error);
        }
      };

      const updatedCloudinaryMedias = await Promise.all(
        cloudinaryMedias.medias.map(async (mediaObj) => {
          if (mediaObj.resource_type === "image") {
            const blob = await urlToFile(mediaObj.eager![0].url);
            return { ...mediaObj, blob };
          } else {
            const eagerUrl = mediaObj.eager![0].url;
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
            return { ...mediaObj, transformations };
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
