import { CldImage } from "next-cloudinary";
import { Dispatch, SetStateAction } from "react";
import { TransformationType } from "..";

function TransformationButton({
  isLoading,
  setIsLoading,
  urlState,
  transformation,
}: {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  urlState: string;
  transformation: TransformationType;
}) {
  const { name, action } = transformation;
  return (
    <li className="cursor-pointer" onClick={() => console.log("ok")}>
      <figure
        className={`relative w-full aspect-square rounded-md overflow-hidden ${
          isLoading ? "bg-base-content/60 animate-pulse" : ""
        }`}
      >
        <CldImage
          src={urlState}
          fill
          alt="image"
          preserveTransformations
          onLoad={() => setIsLoading(false)}
          {...action}
        />
      </figure>
      <p className="p-1 text-xs text-center text-base-content/50">{name}</p>
    </li>
  );
}
export default TransformationButton;
