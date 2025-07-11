import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addToFollowing,
  deleteFromFollowing,
  resetSkip,
} from "@/store/slices/following";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { follow } from "../../../SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/follow";
import { unfollow } from "../../../SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/unfollow";
import { sendFollowNotification } from "../../../SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/sendFollowNotification";

function FollowButton({
  path,
  userId,
}: {
  path: "explore" | "home" | undefined;
  userId: string;
}) {
  const { variant } = useAppSelector((s) => s.modals);

  const { followings } = useAppSelector((s) => s.following);
  const { socket } = useAppSelector((s) => s.socket);
  const dispatch = useAppDispatch();

  const isFollowing = followings.includes(userId);
  const [isLoading, setIsLoading] = useState(false);

  const followAction = useCallback(async () => {
    setIsLoading(true);
    dispatch(addToFollowing(userId));

    try {
      const {
        status: followStatus,
        msg,
        id: followId,
      } = await follow(userId, variant);
      if (followStatus === "fail") {
        toast.error(msg);
        dispatch(deleteFromFollowing(userId));
        return;
      }

      const { status: followNotificaionStatus, followNotificaion } =
        await sendFollowNotification(userId, followId);
      if (followNotificaionStatus === "fail" || !followNotificaion) return;

      socket?.emit("followNotification", followNotificaion);
      if (variant === "followings") {
        dispatch(resetSkip());
      }
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error while following! Please try again.");
      dispatch(deleteFromFollowing(userId));
    } finally {
      setIsLoading(false);
    }
  }, [userId, dispatch, socket]);

  const unfollowAction = useCallback(async () => {
    setIsLoading(true);
    dispatch(deleteFromFollowing(userId));

    try {
      const { status, msg } = await unfollow(userId, variant);
      if (status === "fail") {
        toast.error(msg);
        dispatch(addToFollowing(userId));
        return;
      }
      if (variant === "followings") {
        dispatch(resetSkip());
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
