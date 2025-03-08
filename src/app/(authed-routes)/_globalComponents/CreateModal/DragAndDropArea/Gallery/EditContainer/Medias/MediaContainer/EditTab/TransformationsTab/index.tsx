import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CurrentTabType } from "..";
import { StyleType } from "../../ImageContainer";
import { CldImage, CldOgImage } from "next-cloudinary";
import TransformationButton from "./TransformationButton";

export type ActionType = Record<string, string | number>;
export type TransformationType = { name: string; action: ActionType };

function TransformationsTab({
  currentTab,
  urlState,
}: {
  currentTab: CurrentTabType;
  urlState: string;
}) {
  const transformations: TransformationType[] = [
    {
      name: "Al Dante",
      action: {
        art: "al_dente",
      },
    },
    {
      name: "",
      action: {
        art: "athena",
      },
    },
    {
      name: "",
      action: {
        art: "audrey",
      },
    },
    {
      name: "",
      action: {
        art: "aurora",
      },
    },
    {
      name: "",
      action: {
        art: "daguerre",
      },
    },
    {
      name: "",
      action: {
        art: "eucalyptus",
      },
    },
    {
      name: "",
      action: {
        art: "fes",
      },
    },
    {
      name: "",
      action: {
        art: "frost",
      },
    },
    {
      name: "",
      action: {
        art: "hairspray",
      },
    },
    {
      name: "",
      action: {
        art: "hokusai",
      },
    },
    {
      name: "",
      action: {
        art: "incognito",
      },
    },
    {
      name: "",
      action: {
        art: "linen",
      },
    },
    {
      name: "",
      action: {
        art: "peacock",
      },
    },
    {
      name: "",
      action: {
        art: "primavera",
      },
    },
    {
      name: "",
      action: {
        art: "quartz",
      },
    },
    {
      name: "",
      action: {
        art: "red_rock",
      },
    },
    {
      name: "",
      action: {
        art: "refresh",
      },
    },
    {
      name: "",
      action: {
        art: "sizzle",
      },
    },
    {
      name: "",
      action: {
        art: "sonnet",
      },
    },
    {
      name: "",
      action: {
        art: "ukulele",
      },
    },
    {
      name: "",
      action: {
        art: "zorro",
      },
    },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [containerHeight, setContainerHeight] = useState(100);
  const DivRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (DivRef.current) {
      setContainerHeight(DivRef.current.getBoundingClientRect().height);
    }
  }, [currentTab]);

  return (
    currentTab === "transformations" && (
      <div ref={DivRef} className="h-full">
        <ul
          className="grid grid-cols-[repeat(auto-fit,minmax(88px,1fr))] place-content-start gap-4 p-4 overflow-y-auto"
          style={{ height: containerHeight }}
        >
          {transformations.map((transformation) => (
            <TransformationButton
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              urlState={urlState}
              transformation={transformation}
            />
          ))}
        </ul>
      </div>
    )
  );
}

export default TransformationsTab;
