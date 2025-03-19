"use client";

import { MediaType } from "@/actions/cloudinary";
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
import { uploadToCloudinary } from "./apiCalls/uploadToCloudinary";
import { deleteFromCloudinary } from "./apiCalls/deleteFromCloudinary";
import {
  ControlsType,
  useVideoTrimControls,
} from "./hooks/useVideoTrimControls";

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
  setCloudinaryMedias: Dispatch<SetStateAction<CloudinaryMediasType>>;
  baseCanvasContainerWidth: number;
  controls: ControlsType[];
  setControls: Dispatch<SetStateAction<ControlsType[]>>;
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

  //** Update cloudinaryMedias, add image media object's blob(created from eager.url), add video media object transformations(created from eager.url) */

  useEffect(() => {
    const fetchAndProcessMedias = async () => {
      if (cloudinaryMedias.medias.length === 0) return;

      const urlToFile = async (imageUrl: string) => {
        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          return blob;
        } catch (error) {
          console.log(error);
        }
      };

      const updatedCloudinaryMedias = await Promise.all(
        cloudinaryMedias.medias.map(async (mediaObj) => {
          if (mediaObj.resource_type === "image") {
            const blob = await urlToFile(mediaObj.eager![0].url);
            return { ...mediaObj, blob };
          } else {
            const eagerUrl = mediaObj.eager![0].url;
            const {
              c: crop,
              w: width,
              h: height,
              x,
              y,
            } = Object.fromEntries(
              eagerUrl
                .split("/")[6]
                .split(",")
                .map((item) => item.split("_"))
            );
            const transformations = { crop, width, height, x, y };
            return { ...mediaObj, transformations };
          }
        })
      );

      setCloudinaryMedias((prev) => ({
        ...prev,
        medias: updatedCloudinaryMedias,
      }));
    };

    fetchAndProcessMedias();
  }, [cloudinaryMedias]);

  //** --------------------- */

  useEffect(() => {
    if (AllCanvases.current && AllCanvases.current.length) {
      const formData = new FormData();

      const filesArray: FileObjectType[] = AllCanvases.current.map((Canvas) => {
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

      filesArray.forEach((fileObject) => {
        formData.append("files", fileObject.File);
        formData.append(
          "cloudinarySize",
          JSON.stringify(fileObject.cloudinarySize)
        );
        formData.append(
          "originalSize",
          JSON.stringify(fileObject.originalSize)
        );
        formData.append("ratio", JSON.stringify(fileObject.ratio));
        formData.append("scale", JSON.stringify(fileObject.scale));
        formData.append("size", JSON.stringify(fileObject.size));
        formData.append("position", JSON.stringify(fileObject.position));
      });

      uploadToCloudinary(formData, setCloudinaryMedias, setStep); //TODO : add cloudinaryMedias to cloudinaryMedias in storY
    }

    if (step.step === "crop" && cloudinaryMedias.medias.length > 0) {
      const publicIds = cloudinaryMedias.medias.map((media) => ({
        publicId: media.public_id,
        type: media.resource_type as "image" | "video",
      }));

      deleteFromCloudinary(publicIds, setCloudinaryMedias);
    }
  }, [step]);

  useEffect(() => {
    AllCanvases.current = [];

    //** add cloudinaryMedias publicIds' and type's to store in case user abort posting medias, so we delete media drom cloudinary  */
    if (cloudinaryMedias.medias.length) {
      const publicIds = cloudinaryMedias.medias.map((media) => ({
        publicId: media.public_id,
        type: media.resource_type as "image" | "video",
      }));

      dispatch(addCloudinaryMedias(publicIds));
      //** ************************************** */
    }
  }, [cloudinaryMedias]);
  //! *********************

  //! *** Video Trim Controls ***
  const { controls, setControls } = useVideoTrimControls(cloudinaryMedias);
  //! ******************************

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
      setControls([]);
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
        setCloudinaryMedias,
        baseCanvasContainerWidth,
        controls,
        setControls,
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
