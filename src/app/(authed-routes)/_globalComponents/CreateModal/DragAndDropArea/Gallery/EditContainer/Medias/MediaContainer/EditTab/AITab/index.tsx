import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { CurrentTabType } from "..";
import { TransformationType } from "../TransformationsTab";
import AI_Button from "./AI_Button";

function AITab({
  currentTab,
  url,
  setUrlState,
}: {
  currentTab: CurrentTabType;
  url: string;
  setUrlState: Dispatch<SetStateAction<string>>;
}) {
  const Initial_AI_Transformations = useRef<TransformationType[]>([
    {
      name: "Remove Background",
      action: {
        removeBackground: true,
        background: "blueviolet",
      },
    },
    {
      name: "Remove Object",
      action: {
        remove: {
          prompt: " shoes",
          removeShadow: true,
        },
      },
    },
    {
      name: "Replace Background",
      action: {
        replaceBackground: "ancient egypt",
      },
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prompt, setPrompt] = useState("");

  // const [containerHeight, setContainerHeight] = useState(0);
  // const DivRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (DivRef.current) {
  //     setContainerHeight(DivRef.current.getBoundingClientRect().height);
  //   }
  // }, [currentTab]);

  const getPrompt = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const prompt = formData.get("prompt") as string;
    setPrompt(prompt);
    e.currentTarget.reset();
  };

  return (
    currentTab === "ai" && (
      <div className="h-full">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] place-content-start gap-4 p-4 overflow-y-auto">
          {Initial_AI_Transformations.current.map((transformation, index) => (
            <AI_Button
              key={transformation.name}
              index={index}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              transformation={transformation}
              url={url}
              setUrlState={setUrlState}
              prompt={prompt}
              setPrompt={setPrompt}
            />
          ))}
        </ul>
        <form action="" onSubmit={getPrompt} className="grid p-4 gap-y-4">
          <textarea
            name="prompt"
            id="prompt"
            rows={3}
            className="textarea"
            placeholder="Prompt"
          ></textarea>
          <button type="submit" className="btn btn-primary">
            Prompt It
          </button>
        </form>
      </div>
    )
  );
}

export default AITab;
