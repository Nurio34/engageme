import toast from "react-hot-toast";
import { addToFavorites } from "./_actions/addToFavorites";
import { removeFromFavorites } from "./_actions/removeFromFavorites";
import { useAppDispatch } from "@/store/hooks";
import { closePostSettingsModal } from "@/store/slices/modals";
import { resetSkip } from "@/store/slices/following";

function AddFavoritesButton({
  userId,
  isUserFavorite,
}: {
  userId: string;
  isUserFavorite: boolean;
}) {
  const dispatch = useAppDispatch();

  const addToFavoritesAction = async () => {
    try {
      const { status, msg } = await addToFavorites(userId);
      if (status === "fail") toast.error(msg);
      else {
        dispatch(closePostSettingsModal());
        history.back();
        dispatch(resetSkip());
      }
    } catch (error) {
      toast.error(
        "Unexpected error while adding to favorites. Please try again!"
      );
      console.log(error);
    }
  };

  const removeFromFavoritesAction = async () => {
    try {
      const { status, msg } = await removeFromFavorites(userId);
      if (status === "fail") toast.error(msg);
      else {
        dispatch(closePostSettingsModal());
        history.back();
        dispatch(resetSkip());
      }
    } catch (error) {
      toast.error(
        "Unexpected error while removing from favorites. Please try again!"
      );
      console.log(error);
    }
  };

  return (
    <li className={`py-1 h-12 border-b`}>
      <button
        type="button"
        className="w-full h-full flex justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
          if (isUserFavorite) removeFromFavoritesAction();
          else addToFavoritesAction();
        }}
      >
        {isUserFavorite ? "Remove from favorites" : "Add to favorites"}
      </button>
    </li>
  );
}
export default AddFavoritesButton;
