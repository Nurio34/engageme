import { useState } from "react";
import { MediaType } from "@/actions/cloudinary";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

function Media({ media }: { media: MediaType }) {
  const { baseCanvasContainerWidth } = useCreateModalContext();
  const [isLoading, setIsLoading] = useState(true);

  const { eager, url, duration } = media;
  const eagerUrl = eager![0].url;

  const { c, w, h, x, y } = Object.fromEntries(
    eagerUrl
      .split("/")[6]
      .split(",")
      .map((item) => item.split("_"))
  );

  //! *********************
  const imageUrls = [];
  const timeParam = +(duration! / 5).toFixed(0);
  console.log(timeParam);

  const getImageUrl = () => {
    eagerUrl
      .replace("/video/upload/", "/video/upload/so_5/")
      .replace("mp4", "jpg");
  };

  let time = 0;

  while (time < duration!) {
    const imageUrl = eagerUrl
      .replace("/video/upload/", `/video/upload/so_${time}/`)
      .replace("mp4", "jpg");

    imageUrls.push(imageUrl);
    time = time + timeParam;
  }

  //! ****************

  console.log(imageUrls);

  return (
    <div
      className={`${isLoading ? "bg-base-content/50 animate-pulse" : ""}`}
      style={{ width: baseCanvasContainerWidth }}
    >
      <CldVideoPlayer
        src={url}
        transformation={{
          crop: c,
          width: w,
          height: h,
          x,
          y,
        }}
        onDataLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
export default Media;
