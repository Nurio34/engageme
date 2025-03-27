import GradientCircle from "@/app/_globalComponents/LoadingComponents/GradientCircle";
import {
  LocationType,
  SettingsType,
  useCreateModalContext,
} from "../../../Context";
import { useState } from "react";
import { useUploadEditedImages } from "./hooks/useUploadEditedImages";
import { useUpdateMedias } from "./hooks/useUpdateMedias";
import { usePost } from "./hooks/usePost";

export type UpdatedMedia = {
  publicId: string;
  url: string;
  type: "image" | "video";
  altText?: string;
  poster?: { publicId?: string; url?: string };
  transformation?: Record<string, string | undefined>;
  isAudioAllowed?: boolean;
};

export type PostType = {
  medias: UpdatedMedia[];
  message: string;
  location: LocationType;
  settings: SettingsType;
};

function Sharing() {
  const { editedMedias, altTexts } = useCreateModalContext();

  const [isLoading, setIsLoading] = useState(true);
  const [updatedMedias, setUpdatedMedias] = useState<UpdatedMedia[]>([]);
  const [post, setPost] = useState<PostType>({} as PostType);
  console.log(post);

  const updatedImages = useUploadEditedImages(editedMedias);
  useUpdateMedias(updatedImages, editedMedias, setUpdatedMedias, altTexts);
  usePost(updatedMedias, setPost);

  return (
    <div className="h-full flex justify-center items-center">
      <GradientCircle isLoading={isLoading} />
    </div>
  );
}
export default Sharing;
