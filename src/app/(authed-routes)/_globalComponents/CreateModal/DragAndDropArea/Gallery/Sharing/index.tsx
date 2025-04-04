import GradientCircle from "@/app/_globalComponents/LoadingComponents/GradientCircle";
import {
  LocationType,
  SettingsType,
  useCreateModalContext,
} from "../../../Context";
import { useUploadEditedImages } from "./hooks/useUploadEditedImages";
import { useEffect, useState } from "react";
import { useUpdateMedias } from "./hooks/useUpdateMedias";
import { usePost } from "./hooks/usePost";
import { useSavePost } from "./hooks/useSavePost";
import AnimatedCheckIcon from "@/app/_globalComponents/Svg/AnimatedCheckIcon";
import { useAppDispatch } from "@/store/hooks";
import { toggleCreateModal } from "@/store/slices/modals";

export type UpdatedMedia = {
  publicId: string;
  url: string;
  type: "image" | "video";
  altText?: string;
  poster?: { publicId?: string; url?: string };
  transformation?: Record<string, string | undefined>;
  isAudioAllowed?: boolean;
  width?: number;
  height?: number;
};

export type PostType = {
  medias: UpdatedMedia[];
  message: string;
  location: LocationType;
  settings: SettingsType;
};

function Sharing() {
  const { editedMedias, altTexts, isShared, step } = useCreateModalContext();

  const dispatch = useAppDispatch();

  const [updatedMediasState, setUpdatedMediasState] = useState<UpdatedMedia[]>(
    []
  );

  const [post, setPost] = useState<PostType>({} as PostType);

  const { isComplated, updatedImages } = useUploadEditedImages(editedMedias);
  useUpdateMedias(
    updatedImages,
    isComplated,
    editedMedias,
    setUpdatedMediasState,
    altTexts,
    updatedMediasState
  );

  usePost(updatedMediasState, setPost);
  useSavePost(post);

  useEffect(() => {
    if (step.step === "sharing" && isShared) {
      setTimeout(() => {
        dispatch(toggleCreateModal());
      }, 1500);
    }
  }, [step, isShared]);

  return (
    <div className="h-full flex flex-col gap-y-2 justify-center items-center">
      <div className="relative">
        <GradientCircle isLoading={!isShared} />
        {isShared && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <AnimatedCheckIcon />
          </div>
        )}
      </div>
      {isShared && <p>Your post has been shared</p>}
    </div>
  );
}
export default Sharing;
