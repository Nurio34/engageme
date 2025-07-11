"use client";

import { MediaType } from "@/actions/cloudinary";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
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
import {
  ControlsType,
  useVideoTrimControls,
} from "./_hooks/useVideoTrimControls";
import { useInitialProcess } from "./_hooks/useInitialProcess";
import { useCloudinaryActions } from "./_hooks/useCloudinaryActions";
import { useGlobalCloudinaryMedias } from "./_hooks/useGlobalCloudinaryMedias";
import { useStep } from "./_hooks/useStep";
import { TransformationType } from "./DragAndDropArea/Gallery/EditContainer/Medias/MediaContainer/ImageContainer/EditTab/TransformationsTab";
import { useMessage } from "./_hooks/useMessage";
import { toggle_WannaCloseCreateModal_Modal } from "@/store/slices/modals";
import { useEditMode } from "./_hooks/useEditMode";

export type FilesType = {
  files: File[] | null;
  urls: string[] | null;
};

export type FilesNewOrderType = { [key: number]: number };

export type CanvasContainerSizeType = {
  width: number;
  height: number;
};

export type StepType = {
  action: "previous" | "next";
  step: StepsType;
};

export type StepsType = "new" | "crop" | "edit" | "post" | "sharing";

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
  isInitialProcessComplated: boolean;
  medias: MediaType[];
};

export type GlobalTransformationType = {
  index: number;
  transformations: TransformationType[];
};

export type EditedMedia = {
  blob: Blob;
  publicId: string;
  url: string;
  type: "image" | "video";
  transformation?: Record<string, string | undefined>;
  audio?: Record<string, string | number>;
  isAudioAllowed?: boolean;
  poster?: { publicId?: string; url?: string };
  altText?: string;
};

export type AltTextType = {
  publicId: string;
  altText: string;
};

export type SettingsType = {
  isCountsVisible: boolean;
  isCommentingAllowed: boolean;
};

export type LocationType = { name: string; id: string };

interface ContextType {
  files: FilesType;
  setFiles: Dispatch<SetStateAction<FilesType>>;
  filesNewOrder: FilesNewOrderType;
  setFilesNewOrder: Dispatch<SetStateAction<FilesNewOrderType>>;
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
  globalTransformations: GlobalTransformationType[];
  setGlobalTransformations: Dispatch<
    SetStateAction<GlobalTransformationType[]>
  >;
  controls: ControlsType[];
  setControls: Dispatch<SetStateAction<ControlsType[]>>;
  editedMedias: EditedMedia[];
  setEditedMedias: Dispatch<SetStateAction<EditedMedia[]>>;
  altTexts: AltTextType[];
  setAltTexts: Dispatch<SetStateAction<AltTextType[]>>;
  settings: SettingsType;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  maxMessageLength: number;
  isEmojiPickerOpen: boolean;
  setIsEmojiPickerOpen: Dispatch<SetStateAction<boolean>>;
  isPlacesModalOpen: boolean;
  setIsPlacesModalOpen: Dispatch<SetStateAction<boolean>>;
  location: LocationType;
  setLocation: Dispatch<SetStateAction<LocationType>>;
  isShared: boolean;
  setIsShared: Dispatch<SetStateAction<boolean>>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const { isCreateModalOpen, device } = useAppSelector((s) => s.modals);
  const isDesktop = device.type === "desktop";

  const dispatch = useAppDispatch();

  //! *** files state ***
  const [files, setFiles] = useState<FilesType>({
    files: null,
    urls: null,
  });
  const [filesNewOrder, setFilesNewOrder] = useState<FilesNewOrderType>({});

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

  //! *** Step state ***
  const { step, setStep, goPrevStep, goNextStep } = useStep(
    setBaseCanvasContainerWidth,
    canvasContainerSize,
    files
  );
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

  //! *** GlobalTransformation state ***
  const [globalTransformations, setGlobalTransformations] = useState<
    GlobalTransformationType[]
  >([]);
  //! **********************************

  //! *** All Canvases states - CloudinaryMedias states && Upload to Cloudinary ***
  const AllCanvases = useRef<CanvasType[]>([]);
  const [cloudinaryMedias, setCloudinaryMedias] =
    useState<CloudinaryMediasType>({
      isLoading: false,
      isInitialProcessComplated: false,
      medias: [],
    });
  const [editedMedias, setEditedMedias] = useState<EditedMedia[]>([]);
  const {
    message,
    setMessage,
    maxMessageLength,
    isEmojiPickerOpen,
    setIsEmojiPickerOpen,
    isPlacesModalOpen,
    setIsPlacesModalOpen,
    location,
    setLocation,
  } = useMessage();

  const [altTexts, setAltTexts] = useState<AltTextType[]>([]);
  const [settings, setSettings] = useState<SettingsType>({
    isCountsVisible: false,
    isCommentingAllowed: false,
  });
  const [isShared, setIsShared] = useState(false);

  //** Update cloudinaryMedias, add image media object's blob(created from eager.url),
  //** add video media object's blob & transformations(created from eager.url)
  useInitialProcess(cloudinaryMedias, setCloudinaryMedias);
  //** ************************************************* */

  //** Call cloudinary functions(upload or delete), depending the step */
  useCloudinaryActions(
    AllCanvases,
    files,
    cloudinaryMedias,
    setCloudinaryMedias,
    step,
    setStep,
    setGlobalTransformations,
    setEditedMedias
  );
  //** **************************************************** */

  //** add cloudinaryMedias publicIds' and type's to store in case user abort posting medias, so we delete media from cloudinary  */
  useGlobalCloudinaryMedias(AllCanvases, cloudinaryMedias);
  //** ************************************** */
  //! *********************

  //! *** Video Trim Controls ***
  const { controls, setControls } = useVideoTrimControls(cloudinaryMedias);
  //! ******************************

  //! *** push history state when "isCreateModalOpen === true" ( for mobile native back button manipulation ) ***

  useEffect(() => {
    if (isCreateModalOpen && !isDesktop) {
      history.pushState({ isCreateModalOpen: true }, "", window.location.href);
    }

    const handlePopState = () => {
      if (isCreateModalOpen && !isDesktop)
        dispatch(toggle_WannaCloseCreateModal_Modal());
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isCreateModalOpen, isDesktop]);

  //! ************************************************************

  useEditMode(
    setEditedMedias,
    setMessage,
    setLocation,
    setSettings,
    setAltTexts,
    setStep
  );

  //! *** when create modal closed, reset context ***

  useEffect(() => {
    if (!isCreateModalOpen) {
      setFiles({ files: null, urls: null });
      setFilesNewOrder({});
      setCurrentIndex(0);
      CanvasContainerRef.current = null;
      setCanvasContainerSize({ width: 0, height: 0 });
      setIsResizingStarted(false);
      setStep({ action: "next", step: "new" });
      setIsAllModalsClosed(true);
      setIsListModalOpen(false);
      AllCanvases.current = [];
      setCloudinaryMedias({
        isLoading: false,
        isInitialProcessComplated: false,
        medias: [],
      });
      setBaseCanvasContainerWidth(0);
      setGlobalTransformations([]);
      setControls([]);
      setEditedMedias([]);
      setAltTexts([]);
      setMessage("");
      setIsEmojiPickerOpen(false);
      setIsPlacesModalOpen(false);
      setLocation({ name: "", id: "" });
      setIsShared(false);
    }
  }, [isCreateModalOpen]);
  //! ***********************************************

  return (
    <Context.Provider
      value={{
        files,
        setFiles,
        filesNewOrder,
        setFilesNewOrder,
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
        globalTransformations,
        setGlobalTransformations,
        controls,
        setControls,
        editedMedias,
        setEditedMedias,
        altTexts,
        setAltTexts,
        settings,
        setSettings,
        message,
        setMessage,
        maxMessageLength,
        isEmojiPickerOpen,
        setIsEmojiPickerOpen,
        isPlacesModalOpen,
        setIsPlacesModalOpen,
        location,
        setLocation,
        isShared,
        setIsShared,
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
