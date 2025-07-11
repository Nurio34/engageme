import { follow } from "@/app/(authed-routes)/_globalComponents/SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/follow";
import { sendFollowNotification } from "@/app/(authed-routes)/_globalComponents/SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/sendFollowNotification";
import { unfollow } from "@/app/(authed-routes)/_globalComponents/SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/unfollow";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addToFollowing,
  deleteFromFollowing,
  resetSkip,
} from "@/store/slices/following";
import { closePostSettingsModal } from "@/store/slices/modals";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

function FollowButton({
  userId,
  followers,
}: {
  userId: string;
  followers: {
    followerId: string;
  }[];
}) {
  const { variant } = useAppSelector((s) => s.modals);

  const { id } = useAppSelector((s) => s.user);
  const { socket } = useAppSelector((s) => s.socket);
  const { followings } = useAppSelector((s) => s.following);
  const isFollowing = followings.includes(userId);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isFollowed = followers?.some(
      (follower) => follower.followerId === id
    );
    if (isFollowed) dispatch(addToFollowing(userId));
    // else dispatch(deleteFromFollowing(userId));
  }, [followers]);

  const followAction = useCallback(async () => {
    setIsLoading(true);
    dispatch(addToFollowing(userId));
    dispatch(closePostSettingsModal());

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
      if (variant === "followings") {
        dispatch(resetSkip());
      } // history.back();

      const { status: followNotificaionStatus, followNotificaion } =
        await sendFollowNotification(userId, followId);
      if (followNotificaionStatus === "fail" || !followNotificaion) return;

      socket?.emit("followNotification", followNotificaion);
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
    dispatch(closePostSettingsModal());

    try {
      const { status, msg } = await unfollow(userId, variant);
      if (status === "fail") {
        toast.error(msg);
        dispatch(addToFollowing(userId));
        return;
      }
      if (variant === "followings") {
        dispatch(resetSkip());
      } // history.back();
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error while unfollowing! Please try again.");
      dispatch(addToFollowing(userId));
    } finally {
      setIsLoading(false);
    }
  }, [userId, dispatch]);

  return (
    <li
      className={`py-1 h-12 border-b
      ${isFollowing ? "text-error font-bold" : ""}
    `}
    >
      <button
        type="button"
        className="w-full h-full flex justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
          if (isFollowing) unfollowAction();
          else followAction();
        }}
        disabled={isLoading}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </li>
  );
}
export default FollowButton;
