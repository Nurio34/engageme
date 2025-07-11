import toast from "react-hot-toast";
import { addToFavorites } from "./_actions/addToFavorites";
import { removeFromFavorites } from "./_actions/removeFromFavorites";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closePostSettingsModal } from "@/store/slices/modals";
import {
  addFavorites,
  deleteFromFavorites,
  resetSkip,
} from "@/store/slices/following";

function AddFavoritesButton({ userId }: { userId: string }) {
  const { variant } = useAppSelector((s) => s.modals);
  const { favorites } = useAppSelector((s) => s.following);
  const isFavorite = favorites.includes(userId);

  const dispatch = useAppDispatch();

  const addToFavoritesAction = async () => {
    try {
      dispatch(addFavorites(userId));
      dispatch(closePostSettingsModal());

      const { status, msg } = await addToFavorites(userId, variant);
      if (status === "fail") {
        toast.error(msg);
        dispatch(deleteFromFavorites(userId));
      } else {
        if (variant === "favorites") {
          dispatch(resetSkip());
        }
        history.back();
      }
    } catch (error) {
      toast.error(
        "Unexpected error while adding to favorites. Please try again!"
      );
      dispatch(deleteFromFavorites(userId));

      console.log(error);
    }
  };

  const removeFromFavoritesAction = async () => {
    try {
      dispatch(deleteFromFavorites(userId));
      dispatch(closePostSettingsModal());

      const { status, msg } = await removeFromFavorites(userId, variant);
      if (status === "fail") {
        dispatch(addFavorites(userId));

        toast.error(msg);
      } else {
        if (variant === "favorites") {
          dispatch(resetSkip());
        }
        history.back();
      }
    } catch (error) {
      dispatch(addFavorites(userId));

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
          if (isFavorite) removeFromFavoritesAction();
          else addToFavoritesAction();
        }}
      >
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </button>
    </li>
  );
}
export default AddFavoritesButton;
