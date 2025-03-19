import { useEffect, useState } from "react";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

function Media({
  eagerUrl,
  url,
  poster,
  asset_id,
}: {
  eagerUrl: string;
  url: string;
  poster: string | undefined;
  asset_id: string;
}) {
  const { baseCanvasContainerWidth, cloudinaryMedias, setCloudinaryMedias } =
    useCreateModalContext();
  console.log(cloudinaryMedias);
  const [isLoaded, setisLoaded] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    setIsRendered(false);
  }, [cloudinaryMedias]);

  useEffect(() => {
    if (!isRendered) setIsRendered(true);
  }, [isRendered]);

  const { c, w, h, x, y } = Object.fromEntries(
    eagerUrl
      .split("/")[6]
      .split(",")
      .map((item) => item.split("_"))
  );
  const { so, du } = Object.fromEntries(
    url
      .split("/")[6]
      .split(",")
      .map((item) => item.split("_"))
  );

  useEffect(() => {
    const updatedMedias = cloudinaryMedias.medias.map((mediaObj) => {
      if (mediaObj.asset_id === asset_id) {
        return {
          ...mediaObj,
          transformations: {
            ...mediaObj.transformations,
            start_offset: so,
            duration: du,
          },
        };
      }
      return mediaObj;
    });
    console.log({ updatedMedias });
  }, [so, du]);

  return (
    <div
      className={`${!isLoaded ? "bg-base-content/50 animate-pulse" : ""}`}
      style={{ width: baseCanvasContainerWidth }}
    >
      {isRendered && (
        <CldVideoPlayer
          src={url}
          transformation={{
            crop: c,
            width: w,
            height: h,
            x,
            y,
            start_offset: so,
            duration: du,
          }}
          onDataLoad={() => setisLoaded(true)}
          poster={poster}
        />
      )}
    </div>
  );
}
export default Media;
