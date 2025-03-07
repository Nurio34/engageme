import { MediaType } from "@/actions/cloudinary";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { CldImage } from "next-cloudinary";

function ImageContainer({ index, media }: { index: number; media: MediaType }) {
  const { currentIndex } = useCreateModalContext();
  const { eager } = media;
  const { url } = eager![0];

  const transformations = url
    .split("/")[6]
    .split(",")
    .map((item, index) => {
      console.log(item);
      //TODO : create transformation object from eager url
    });
  console.log(transformations);

  return (
    currentIndex === index && (
      <figure className="relative bg-red-400 h-full">
        <CldImage src={url} fill sizes="100vw" alt="Description of my image" />
      </figure>
    )
  );
}
export default ImageContainer;
