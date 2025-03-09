import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CurrentTabType } from "..";
import TransformationButton from "./TransformationButton";
import { getCldImageUrl } from "next-cloudinary";
import { useEditContext } from "../../../../Context";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";

export type ActionType = Record<string, string | number | boolean>;
export type TransformationType = {
  name: string;
  action: ActionType;
  url?: string;
};

function TransformationsTab({
  currentTab,
  url,
  setUrlState,
  setIsNewUrlDownloading,
}: {
  currentTab: CurrentTabType;
  url: string;
  setUrlState: Dispatch<SetStateAction<string>>;
  setIsNewUrlDownloading: Dispatch<SetStateAction<boolean>>;
}) {
  const initialTransformations: TransformationType[] = [
    {
      name: "original",
      action: {},
    },
    {
      name: "al dante",
      action: {
        art: "al_dente",
      },
    },
    {
      name: "daguerre",
      action: {
        art: "daguerre",
      },
    },
    {
      name: "fes",
      action: {
        art: "fes",
      },
    },
    {
      name: "hairspray",
      action: {
        art: "hairspray",
      },
    },
    {
      name: "peacock",
      action: {
        art: "peacock",
      },
    },
    {
      name: "red rock",
      action: {
        art: "red_rock",
      },
    },
    {
      name: "sizzle",
      action: {
        art: "sizzle",
      },
    },
    {
      name: "zorro",
      action: {
        art: "zorro",
      },
    },
    {
      name: "black & white",
      action: {
        blackwhite: true,
      },
    },
    {
      name: "cartoonify",
      action: {
        cartoonify: true,
      },
    },
    {
      name: "negate",
      action: {
        negate: true,
      },
    },
    {
      name: "oil paint",
      action: {
        oilPaint: "100",
      },
    },
    {
      name: "vibrance",
      action: {
        vibrance: "100",
      },
    },
    {
      name: "vignette",
      action: {
        vignette: "100",
      },
    },
  ];

  const { currentIndex } = useCreateModalContext();
  const { globalTransformations, setGlobalTransformations } = useEditContext();
  const currentTransformation = globalTransformations.filter(
    (item) => item.index === currentIndex
  )[0];

  const [isLoading, setIsLoading] = useState(true);
  const [containerHeight, setContainerHeight] = useState(100);
  const DivRef = useRef<HTMLDivElement | null>(null);

  const [currentInd, setCurrentInd] = useState(0);

  useEffect(() => {
    if (DivRef.current) {
      setContainerHeight(DivRef.current.getBoundingClientRect().height);
    }
  }, [currentTab]);

  useEffect(() => {
    const fetchImage = async (modifiedUrl: string) => {
      try {
        const response = await fetch(modifiedUrl);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        return objectUrl;
      } catch (error) {
        console.log(error);
        fetchImage(modifiedUrl);
      }
    };

    const fetchAllImages = async () => {
      try {
        const imagePromises = initialTransformations.map(
          async (transformation) => {
            const { action } = transformation;

            const modifiedUrl = getCldImageUrl({
              src: url,
              preserveTransformations: true,
              art: action.art as string,
              blackwhite: action.blackwhite as boolean,
              cartoonify: action.cartoonify as boolean,
              negate: action.negate as boolean,
              oilPaint: action.oilPaint as string,
              vibrance: action.vibrance as string,
              vignette: action.vignette as string,
            });
            const fetchedUrl = await fetchImage(modifiedUrl);
            return { ...transformation, url: fetchedUrl };
          }
        );

        const updatedTransformations = await Promise.all(imagePromises);

        setGlobalTransformations((prev) => {
          const exists = prev.some((item) => item.index === currentIndex);

          if (exists) {
            return prev;
          }

          return [
            ...prev,
            { index: currentIndex, transformations: updatedTransformations },
          ];
        });
      } catch (error) {
        console.log("Error fetching images:", error);
        fetchAllImages();
      }
    };

    if (!currentTransformation) {
      fetchAllImages();
    }
  }, [currentIndex]);

  return (
    currentTab === "transformations" && (
      <div ref={DivRef} className="h-full">
        <ul
          className="grid grid-cols-[repeat(auto-fit,minmax(88px,1fr))] place-content-start gap-4 p-4 overflow-y-auto"
          style={{ height: containerHeight }}
        >
          {currentTransformation?.transformations.map(
            (transformation, index) => (
              <TransformationButton
                key={index}
                index={index}
                currentInd={currentInd}
                setCurrentInd={setCurrentInd}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                transformation={transformation}
                setUrlState={setUrlState}
                setIsNewUrlDownloading={setIsNewUrlDownloading}
              />
            )
          )}
        </ul>
      </div>
    )
  );
}

export default TransformationsTab;
