import { MediaType } from "@/actions/cloudinary";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { scaleDown } from "../utils/scaleDown";
import Media from "./Media";
import EditTab from "../EditTab";
import { useState } from "react";

export type StyleType = Record<string, string | number>;

function ImageContainer({ index, media }: { index: number; media: MediaType }) {
  const { currentIndex } = useCreateModalContext();
  const { eager, width, height } = media;
  const { url } = eager![0];

  const [urlState, setUrlState] = useState(url);

  //! *** Scale down image to be able to "Enhance" applied ***
  const { newWidth, newHeight } = scaleDown(width, height);
  //! ********************

  const [style, setStyle] = useState<StyleType>({});

  return (
    currentIndex === index && (
      <div className="h-full flex">
        <Media urlState={urlState} style={style} />
        <EditTab urlState={urlState} setStyle={setStyle} />
      </div>
    )
  );
}
export default ImageContainer;
