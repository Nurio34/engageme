import { MediaType } from "@/actions/cloudinary";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { CldImage } from "next-cloudinary";
import { scaleDown } from "../utils/scaleDown";

function ImageContainer({ index, media }: { index: number; media: MediaType }) {
  const { currentIndex } = useCreateModalContext();
  const { eager, width, height } = media;
  const { url } = eager![0];
  console.log(media);

  //! *** Scale down image to be able to "Enhance" applied ***
  const { newWidth, newHeight } = scaleDown(width, height);
  console.log({ newWidth, newHeight });
  //! ********************

  return (
    currentIndex === index && (
      <figure className="relative h-full">
        <CldImage
          draggable="false"
          priority
          src={url}
          fill
          preserveTransformations
          alt="Description of my image"
          //? removeBackground
          //? outline="outer:15:200" // mode(inner,inner_fill,fill,outer):width(1-100):blur(1-200)
          //? autoContrast // 1 - 100
          //? assistColorblind="xray" // 1 - 100 / "xray"
          //? brightness="-70" // -99 - 100
          //? brightnessHSB="-50" // -99 - 100
          //? fillLight="00:100" // blend(0-100):light(-100-100)
          //? gamma="150" // -50 - 150
          //? cartoonify="100:bw" // line(0-199):color(0-100 / "bw")
          //? colorize="50" // 0 - 100
          //? contrast="50" // -99 - 100
          //? distort="150:340:1500:10:1500:1550:50:1000"
          //? distort="arc:180"
          //? gradientFade="symmetric_pad,x_0.2,y_0.2"
          //? grayscale
          //? improve
          //? negate
          //? oilPaint="100" // 0 - 100
          //? pixelate="40" // 1 - 200
        />
      </figure>
    )
  );
}
export default ImageContainer;
