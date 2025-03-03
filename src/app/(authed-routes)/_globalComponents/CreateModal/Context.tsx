"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggle_WannaCloseCreateModal_Modal } from "@/store/slices/modals";
import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";

export type FilesType = {
  files: File[] | null;
  urls: string[] | null;
};

export type CanvasContainerSizeType = {
  width: number;
  height: number;
};

export type StepType = "new" | "crop" | "edit" | "post";

interface ContextType {
  files: FilesType;
  setFiles: React.Dispatch<React.SetStateAction<FilesType>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  CanvasContainerRef: RefObject<HTMLDivElement | null>;
  canvasContainerSize: CanvasContainerSizeType;
  setCanvasContainerSize: React.Dispatch<
    React.SetStateAction<CanvasContainerSizeType>
  >;
  isResizingStarted: boolean;
  setIsResizingStarted: React.Dispatch<React.SetStateAction<boolean>>;
  step: StepType;
  goPrevStep: () => void;
  goNextStep: () => void;
  isAllModalsClosed: boolean;
  setIsAllModalsClosed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  //! *** files state ***
  const [files, setFiles] = useState<FilesType>({
    files: null,
    urls: null,
  });

  useEffect(() => {
    if (files.files) {
      toast.success("New files's been added to Gallery ..");
    }
  }, [files]);

  //! ******************
  const [currentIndex, setCurrentIndex] = useState(0);

  //! *** CanvasContainer States ***
  const CanvasContainerRef = useRef<HTMLDivElement | null>(null);

  const [canvasContainerSize, setCanvasContainerSize] =
    useState<CanvasContainerSizeType>({
      width: 0,
      height: 0,
    });
  //! ******************************

  //! *** resizing start-end state ***
  const [isResizingStarted, setIsResizingStarted] = useState(false);
  //! ********************************

  //! *** step state ***
  const [step, setStep] = useState<StepType>("new");
  const steps: StepType[] = ["new", "crop", "edit", "post"];
  const dispatch = useAppDispatch();

  const goPrevStep = () => {
    const prevStepIndex = steps.indexOf(step) - 1;

    if (prevStepIndex < 1) {
      dispatch(toggle_WannaCloseCreateModal_Modal());
      return;
    }

    setStep(steps[prevStepIndex]);
  };

  const goNextStep = () => {
    const nextStepIndex = steps.indexOf(step) + 1;

    if (nextStepIndex === steps.length) {
      return;
    }

    setStep(steps[nextStepIndex]);
  };

  useEffect(() => {
    if (files.files && files.files.length > 0) {
      goNextStep();
    }
  }, [files]);
  //! ******************

  //! *** Close all action modals when next o prev button clicked ***
  const [isAllModalsClosed, setIsAllModalsClosed] = useState(false);

  useEffect(() => {
    if (isAllModalsClosed) {
      setIsAllModalsClosed(false);
    }
  }, [isAllModalsClosed]);
  //! ***************************************************************

  //! *** when create modal closed, reset context ***
  const { isCreateModalOpen } = useAppSelector((s) => s.modals);

  useEffect(() => {
    if (!isCreateModalOpen) {
      setFiles({ files: null, urls: null });
      setCurrentIndex(0);
      CanvasContainerRef.current = null;
      setCanvasContainerSize({ width: 0, height: 0 });
      setIsResizingStarted(false);
      setStep("new");
    }
  }, [isCreateModalOpen]);
  //! ***********************************************

  return (
    <Context.Provider
      value={{
        files,
        setFiles,
        currentIndex,
        setCurrentIndex,
        CanvasContainerRef,
        canvasContainerSize,
        setCanvasContainerSize,
        isResizingStarted,
        setIsResizingStarted,
        step,
        goPrevStep,
        goNextStep,
        isAllModalsClosed,
        setIsAllModalsClosed,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCreateModalContext = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useCountContext must be used within a Provider");
  return context;
};
