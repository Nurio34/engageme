import { MediaType } from "@/actions/cloudinary";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { scaleDown } from "../utils/scaleDown";
import Media from "./Media";
import { useState } from "react";
import EditTab from "./EditTab";

export type StyleType = Record<string, number>;

function ImageContainer({ index, media }: { index: number; media: MediaType }) {
  const { currentIndex } = useCreateModalContext();
  const { eager, width, height } = media;
  const { url } = eager![0];

  const [urlState, setUrlState] = useState(url);
  const [isNewUrlDownloading, setIsNewUrlDownloading] = useState(true);

  //! *** Scale down image to be able to "Enhance" applied ***
  const { newWidth, newHeight } = scaleDown(width, height);
  // TODO:LINT console.log({ newWidth, newHeight });
  //! ********************

  const [style, setStyle] = useState<StyleType>({
    brightness: 1,
    contrast: 1,
    sepia: 0,
    saturate: 1,
    "hue-rotate": 0,
    blur: 0,
  });

  const [otherStyle, setOtherStyle] = useState<StyleType>({
    opacity: 1,
    depth: 0,
  });

  return (
    currentIndex === index && (
      <div className="h-full flex">
        <Media
          urlState={urlState}
          style={style}
          otherStyle={otherStyle}
          isNewUrlDownloading={isNewUrlDownloading}
          setIsNewUrlDownloading={setIsNewUrlDownloading}
        />
        <EditTab
          url={url}
          style={style}
          setStyle={setStyle}
          setOtherStyle={setOtherStyle}
          setUrlState={setUrlState}
          setIsNewUrlDownloading={setIsNewUrlDownloading}
        />
      </div>
    )
  );
}
export default ImageContainer;
