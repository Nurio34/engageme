"use client";

import {
  deleteFilesFromCloudinary,
  MediaType,
  uploadFilesToCloudinary,
} from "@/actions/cloudinary";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addCloudinaryMedias,
  toggle_WannaCloseCreateModal_Modal,
} from "@/store/slices/modals";
import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
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

export type StepType = {
  action: "previous" | "next";
  step: StepsType;
};

export type StepsType = "new" | "crop" | "edit" | "post";

export type CanvasType = {
  ref: HTMLCanvasElement;
  index: number;
  originalSize: {
    w: number;
    h: number;
  };
  ratio: number;
  scale: number;
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
  scale: number;
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

export type CloudinaryMediasType = {
  isLoading: boolean;
  medias: MediaType[];
};

interface ContextType {
  files: FilesType;
  setFiles: Dispatch<SetStateAction<FilesType>>;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  CanvasContainerRef: RefObject<HTMLDivElement | null>;
  canvasContainerSize: CanvasContainerSizeType;
  setCanvasContainerSize: Dispatch<SetStateAction<CanvasContainerSizeType>>;
  isResizingStarted: boolean;
  setIsResizingStarted: Dispatch<SetStateAction<boolean>>;
  step: StepType;
  goPrevStep: () => void;
  goNextStep: () => void;
  isAllModalsClosed: boolean;
  setIsAllModalsClosed: Dispatch<SetStateAction<boolean>>;
  isListModalOpen: boolean;
  setIsListModalOpen: Dispatch<SetStateAction<boolean>>;
  AllCanvases: RefObject<CanvasType[]>;
  cloudinaryMedias: CloudinaryMediasType;
  baseCanvasContainerWidth: number;
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
  const [baseCanvasContainerWidth, setBaseCanvasContainerWidth] = useState(0);
  //! ******************************

  //! *** resizing start-end state ***
  const [isResizingStarted, setIsResizingStarted] = useState(false);
  //! ********************************

  //! *** step state ***
  const [step, setStep] = useState<StepType>({ action: "next", step: "new" });
  const steps: StepsType[] = ["new", "crop", "edit", "post"];
  const dispatch = useAppDispatch();

  const goPrevStep = () => {
    const prevStepIndex = steps.indexOf(step.step) - 1;

    if (prevStepIndex < 1) {
      dispatch(toggle_WannaCloseCreateModal_Modal());
      return;
    }

    setStep({ action: "previous", step: steps[prevStepIndex] });
  };

  const goNextStep = () => {
    const nextStepIndex = steps.indexOf(step.step) + 1;

    if (nextStepIndex === steps.length) {
      return;
    }

    if (step.step === "crop") {
      setBaseCanvasContainerWidth(canvasContainerSize.width);
    }

    setStep({ action: "next", step: steps[nextStepIndex] });
  };

  useEffect(() => {
    if (files.files && files.files.length > 0) {
      setStep({ action: "previous", step: "crop" });
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
  const [cloudinaryMedias, setCloudinaryMedias] =
    useState<CloudinaryMediasType>({ isLoading: false, medias: [] });

  useEffect(() => {
    if (AllCanvases.current && AllCanvases.current.length) {
      const filesArray: FileObjectType[] = [];
      const promises = AllCanvases.current.map(async (Canvas) => {
        return {
          File: files.files![Canvas.index],
          cloudinarySize: Canvas.cloudinarySize,
          originalSize: Canvas.originalSize,
          ratio: Canvas.ratio,
          scale: Canvas.scale,
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
            setCloudinaryMedias((prev) => ({ ...prev, isLoading: true }));
            const response = await uploadFilesToCloudinary(filesArray);
            if (response.status === "error") {
              toast.error("Something went wrong! Please try again!");
              return;
            }
            setCloudinaryMedias((prev) => ({
              ...prev,
              medias: response.medias,
            }));
            dispatch(
              addCloudinaryMedias(
                response.medias.map((media) => ({
                  publicId: media.public_id,
                  type: media.resource_type as "image" | "video",
                }))
              )
            );
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong! Please try again!");
          } finally {
            setCloudinaryMedias((prev) => ({ ...prev, isLoading: false }));
          }
        };
        uploadFilesToCloudinaryAction(filesArray);
      });
      AllCanvases.current = [];
    }

    if (step.step === "crop" && cloudinaryMedias.medias.length > 0) {
      const deleteFilesFromCloudinaryAction = async () => {
        const mediaPublicIds = cloudinaryMedias.medias.map((media) => ({
          publicId: media.public_id,
          type: media.resource_type as "image" | "video",
        }));

        try {
          setCloudinaryMedias((prev) => ({ ...prev, isLoading: true }));

          const response = await deleteFilesFromCloudinary(mediaPublicIds);

          if (response === "success") {
            setCloudinaryMedias((prev) => ({ ...prev, medias: [] }));
          } else {
            deleteFilesFromCloudinaryAction();
          }
        } catch (error) {
          console.log(error);
          deleteFilesFromCloudinaryAction();
        } finally {
          setCloudinaryMedias((prev) => ({ ...prev, isLoading: false }));
        }
      };
      deleteFilesFromCloudinaryAction();
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
      setStep({ action: "next", step: "new" });
      setIsAllModalsClosed(true);
      setIsListModalOpen(false);
      AllCanvases.current = [];
      setCloudinaryMedias({ isLoading: false, medias: [] });
      setBaseCanvasContainerWidth(0);
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
        cloudinaryMedias,
        baseCanvasContainerWidth,
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
