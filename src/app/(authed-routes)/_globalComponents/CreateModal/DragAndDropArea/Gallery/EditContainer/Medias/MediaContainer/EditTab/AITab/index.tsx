import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CurrentTabType } from "..";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { getCldImageUrl } from "next-cloudinary";
import { TransformationType } from "../TransformationsTab";

function AITab({
  currentTab,
  url,
  setUrlState,
}: {
  currentTab: CurrentTabType;
  url: string;
  setUrlState: Dispatch<SetStateAction<string>>;
}) {
  console.log({ setUrlState });

  const AI_Transformations: TransformationType[] = [
    {
      name: "Remove Background",
      action: {
        removeBackground: true,
      },
    },
  ];

  const { currentIndex } = useCreateModalContext();

  const [containerHeight, setContainerHeight] = useState(100);
  const DivRef = useRef<HTMLDivElement | null>(null);

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
      }
    };

    AI_Transformations.forEach(async (transformation) => {
      const { name, action } = transformation;

      const modifiedUrl = getCldImageUrl({
        src: url,
        preserveTransformations: true,
        removeBackground: action.removeBackground as boolean,
      });
      const fetchedUrl = await fetchImage(modifiedUrl);

      console.log({ name, fetchedUrl });
    });
  }, [currentIndex]);

  return (
    currentTab === "ai" && (
      <div ref={DivRef} className="h-full">
        <ul
          className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] place-content-start gap-4 p-4 overflow-y-auto"
          style={{ height: containerHeight }}
        >
          <li className="cursor-pointer">
            <figure
              className={`relative w-full aspect-square rounded-md overflow-hidden `}
            ></figure>
            <p
              className={`p-1 text-xs text-center text-base-content/50 capitalize`}
            >
              Name
            </p>
          </li>
        </ul>
      </div>
    )
  );
}
export default AITab;
