import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ActionType, TransformationType } from "../../TransformationsTab";
import { getCldImageUrl } from "next-cloudinary";
import Image from "next/image";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";

function AI_Button({
  index,
  currentIndex,
  setCurrentIndex,
  transformation,
  url,
  setUrlState,
  prompt,
  setPrompt,
}: {
  index: number;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  transformation: TransformationType;
  url: string;
  setUrlState: Dispatch<SetStateAction<string>>;
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
}) {
  const [transformationState, setTransformationState] =
    useState<TransformationType>(transformation);
  const [isLoading, setIsLoading] = useState(false);

  console.log(transformation);

  useEffect(() => {
    const getAction = (): ActionType => {
      if (index === 0) {
        return {
          removeBackground: true,
          background: prompt,
        };
      } else if (index === 1) {
        return {
          remove: {
            prompt: prompt,
            removeShadow: true,
          },
        };
      } else {
        return { replaceBackground: "ancient egypt" };
      }
    };

    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const modifiedUrl = getCldImageUrl({
          src: url,
          preserveTransformations: true,
          ...getAction,
        });
        const response = await fetch(modifiedUrl);
        if (response.status >= 400) {
          // Retry after 2 seconds if locked
          setTimeout(fetchImage, 2000);
          return;
        }
        if (!response.ok) {
          setTimeout(fetchImage, 2000);
          return;
        }
        if (index === 0) {
          console.log(response.url);
        }
        setTransformationState((prev) => ({ ...prev, url: response.url }));
      } catch (error) {
        console.log("error");
        setTimeout(fetchImage, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, []);

  return (
    <li
      key={transformation.name}
      className="cursor-pointer"
      onClick={() => {
        setCurrentIndex(index);
        if (transformationState.url) setUrlState(transformationState.url);
      }}
    >
      <figure
        className={`relative w-full aspect-square rounded-md overflow-hidden
            ${isLoading ? "bg-base-content/50 animate-pulse" : ""}  
            ${
              currentIndex === index ? "outline outline-2 outline-primary" : ""
            }  
        `}
      >
        {transformationState.url && (
          <Image src={transformationState.url} fill alt="image" />
        )}
      </figure>
      <p className="p-1 text-xs text-center text-base-content/50 capitalize">
        {transformation.name}
      </p>
    </li>
  );
}
export default AI_Button;
