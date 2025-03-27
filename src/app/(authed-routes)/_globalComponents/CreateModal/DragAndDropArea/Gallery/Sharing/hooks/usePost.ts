import { Dispatch, SetStateAction, useEffect } from "react";
import { PostType, UpdatedMedia } from "..";
import { useCreateModalContext } from "../../../../Context";

export const usePost = (
  updatedMedias: UpdatedMedia[],
  setPost: Dispatch<SetStateAction<PostType>>
) => {
  const { message, location, settings } = useCreateModalContext();

  useEffect(() => {
    if (updatedMedias.length === 0) return;
    setPost({ medias: updatedMedias, message, location, settings });
  }, [updatedMedias]);
};
