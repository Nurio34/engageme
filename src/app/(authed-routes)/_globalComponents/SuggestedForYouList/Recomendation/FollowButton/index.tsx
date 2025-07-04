import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToFollowing, deleteFromFollowing } from "@/store/slices/following";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { follow } from "../../../SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/follow";
import { unfollow } from "../../../SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/unfollow";

function FollowButton({
  path,
  userId,
}: {
  path: "explore" | "home" | undefined;
  userId: string;
}) {
  const { followings } = useAppSelector((s) => s.following);
  const dispatch = useAppDispatch();

  const isFollowing = followings.includes(userId);
  const [isLoading, setIsLoading] = useState(false);

  const followAction = useCallback(async () => {
    setIsLoading(true);
    dispatch(addToFollowing(userId));

    try {
      const { status, msg } = await follow(userId);
      if (status === "fail") {
        toast.error(msg);
        dispatch(deleteFromFollowing(userId));
      }
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error while following! Please try again.");
      dispatch(deleteFromFollowing(userId));
    } finally {
      setIsLoading(false);
    }
  }, [userId, dispatch]);

  const unfollowAction = useCallback(async () => {
    console.log("unfollowAction");
    setIsLoading(true);
    dispatch(deleteFromFollowing(userId));

    try {
      const { status, msg } = await unfollow(userId);
      if (status === "fail") {
        toast.error(msg);
        dispatch(addToFollowing(userId));
      }
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error while unfollowing! Please try again.");
      dispatch(addToFollowing(userId));
    } finally {
      setIsLoading(false);
    }
  }, [userId, dispatch]);

  return (
    <button
      type="button"
      className={`${
        path === "home"
          ? "text-xs font-medium text-primary transition-colors hover:text-primary/70"
          : `btn btn-sm ${isFollowing ? "btn-secondary" : " btn-primary "}`
      }`}
      onClick={isFollowing ? unfollowAction : followAction}
      disabled={isLoading}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}
export default FollowButton;
