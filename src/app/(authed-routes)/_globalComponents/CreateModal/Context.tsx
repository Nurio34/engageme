"use client";

import {
  ResponseType,
  uploadFilesToCloudinary,
} from "@/actions/cloudinary/uploadFilesToCloudinary";
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

export type FilesType = {
  files: File[] | null;
  urls: string[] | null;
};

export type CanvasContainerSizeType = {
  width: number;
  height: number;
};

export type StepType = "new" | "crop" | "edit" | "post";

export type CanvasType = {
  ref: HTMLCanvasElement;
  index: number;
  originalSize: {
    w: number;
    h: number;
  };
  ratio: number;
  cloudinarySize: {
    w: number;
    h: number;
  };
  size: {
    w: number;
    h: number;
  };
  isVideo: boolean;
  position: {
    x: number;
    y: number;
  };
};

export type FileObjectType = {
  File: File;
  originalSize: {
    w: number;
    h: number;
  };
  ratio: number;
  cloudinarySize: {
    w: number;
    h: number;
  };
  size: {
    w: number;
    h: number;
  };
  position: {
    x: number;
    y: number;
  };
};

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
  isListModalOpen: boolean;
  setIsListModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  AllCanvases: RefObject<CanvasType[]>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  //! *** files state ***
  const [files, setFiles] = useState<FilesType>({
    files: null,
    urls: null,
  });

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
      setStep("crop");
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

  //! *** Media-list state
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  //! ********************

  //! *** All Canvas' States && Upload to Cloudinary ***
  const AllCanvases = useRef<CanvasType[]>([]);
  const [cloudinaryMedias, setCloudinaryMedias] = useState<ResponseType[]>([]);
  console.log(AllCanvases.current);
  console.log(cloudinaryMedias);

  useEffect(() => {
    //! *** turn the image in canvas to File , ... !!! Now i dont use it !!! ***
    //?const getFile = async (Canvas: CanvasType): Promise<File> => {
    //?  const file = await new Promise((resolve) => {
    //?    Canvas.ref.toBlob((blob) => {
    //?      const file = new File([blob!], `canvas_image_${Canvas.index}.png`, {
    //?        type: "image/png",
    //?      });
    //?      resolve(file);
    //?    }, "image/png");
    //?  });
    //?  return file as File;
    //?};
    //! ********************************************************************

    if (AllCanvases.current && AllCanvases.current.length > 0) {
      const filesArray: FileObjectType[] = [];
      const promises = AllCanvases.current.map(async (Canvas) => {
        return {
          File: files.files![Canvas.index],
          cloudinarySize: Canvas.cloudinarySize,
          originalSize: Canvas.originalSize,
          ratio: Canvas.ratio,
          size: Canvas.size,
          position: Canvas.position,
        };
      });

      Promise.all(promises).then((files: FileObjectType[]) => {
        files.forEach((file) => {
          filesArray.push(file);
        });
        const uploadFilesToCloudinaryAction = async (
          filesArray: FileObjectType[]
        ) => {
          try {
            const response = await uploadFilesToCloudinary(filesArray);
            setCloudinaryMedias(response);
          } catch (error) {}
        };
        uploadFilesToCloudinaryAction(filesArray);
      });
    }
  }, [step]);

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
      setIsAllModalsClosed(true);
      setIsListModalOpen(false);
      AllCanvases.current = [];
      setCloudinaryMedias([]);
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
        isListModalOpen,
        setIsListModalOpen,
        AllCanvases,
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
