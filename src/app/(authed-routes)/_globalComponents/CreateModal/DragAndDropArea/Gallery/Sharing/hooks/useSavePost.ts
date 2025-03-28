import { Dispatch, SetStateAction, useEffect } from "react";
import { PostType } from "..";
import { savePost } from "../../../../actions/savePost";
import { useCreateModalContext } from "../../../../Context";

export const useSavePost = (post: PostType) => {
  const { goPrevStep, setIsShared } = useCreateModalContext();

  useEffect(() => {
    const isPostCreated = Object.keys(post).length > 0;

    if (!isPostCreated) return;

    const savePostAction = async () => {
      try {
        const { status } = await savePost(post);
        if (status === "fail") {
          goPrevStep();
        } else {
          setIsShared(true);
          console.log("savePostAction() success");
        }
      } catch (error) {
        console.log(error);
      }
    };

    savePostAction();
  }, [post]);
};
