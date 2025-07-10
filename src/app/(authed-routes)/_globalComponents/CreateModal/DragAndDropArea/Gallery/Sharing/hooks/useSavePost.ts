import { useEffect } from "react";
import { PostType } from "..";
import { savePost } from "../../../../actions/savePost";
import { useCreateModalContext } from "../../../../Context";
import toast from "react-hot-toast";
import { useAppSelector } from "@/store/hooks";
import { editPost } from "../../../../actions/editPost";

export const useSavePost = (post: PostType) => {
  const { isEditing, postId } = useAppSelector((s) => s.postEdit);

  const { goPrevStep, setIsShared } = useCreateModalContext();

  useEffect(() => {
    const isPostCreated = Object.keys(post).length > 0;

    if (!isPostCreated) return;
    console.log("useSavePost() succes");

    const savePostAction = async () => {
      try {
        const { status, message } = await savePost(post);
        if (status === "fail") {
          toast.error(message);
          goPrevStep();
        } else {
          setIsShared(true);
          console.log("savePostAction() success");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const editPostAction = async () => {
      try {
        const { status, message } = await editPost(postId, post);

        if (status === "fail") {
          toast.error(message);
          goPrevStep();
        } else {
          setIsShared(true);
          console.log("editPostAction() success");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isEditing) editPostAction();
    else savePostAction();
  }, [post]);
};
