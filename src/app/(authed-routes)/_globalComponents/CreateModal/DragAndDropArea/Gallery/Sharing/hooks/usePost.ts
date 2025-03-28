import { Dispatch, SetStateAction, useEffect } from "react";
import { PostType, UpdatedMedia } from "..";
import { useCreateModalContext } from "../../../../Context";

export const usePost = (
  updatedMediasState: UpdatedMedia[],
  setPost: Dispatch<SetStateAction<PostType>>
) => {
  const { message, location, settings } = useCreateModalContext();

  useEffect(() => {
    if (updatedMediasState.length === 0) return;
    setPost({ medias: updatedMediasState, message, location, settings });
    console.log("usePost() success");
  }, [updatedMediasState]);
};
