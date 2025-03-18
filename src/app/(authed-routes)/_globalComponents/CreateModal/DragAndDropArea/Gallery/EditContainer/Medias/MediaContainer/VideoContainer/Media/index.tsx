import { useEffect, useState } from "react";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

function Media({
  eagerUrl,
  url,
  poster,
}: {
  eagerUrl: string;
  url: string;
  poster: string | undefined;
}) {
  const { baseCanvasContainerWidth, cloudinaryMedias } =
    useCreateModalContext();
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
          }}
          onDataLoad={() => setisLoaded(true)}
          poster={poster}
        />
      )}
    </div>
  );
}
export default Media;
