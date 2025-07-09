import toast from "react-hot-toast";
import { deletePost } from "./_actions/deletePost";
import { useAppDispatch } from "@/store/hooks";
import { closePostSettingsModal } from "@/store/slices/modals";
import { resetSkip } from "@/store/slices/following";
import { useState } from "react";

function DeletePostButton({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const deletePostAction = async () => {
    setIsLoading(true);
    try {
      const { status, msg } = await deletePost(userId, postId);
      if (status === "fail") toast.error(msg);
      else {
        dispatch(resetSkip());
        dispatch(closePostSettingsModal());
        history.back();
      }
    } catch (error) {
      toast.error(
        "Unexpected error while deleting the post! Please try again.."
      );
      console.log(error);
    }
  };

  return (
    <li className="py-1 h-12 text-error font-bold border-b">
      <button
        type="button"
        className="w-full h-full flex justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
          deletePostAction();
        }}
        disabled={isLoading}
      >
        Delete xx
      </button>
    </li>
  );
}
export default DeletePostButton;
