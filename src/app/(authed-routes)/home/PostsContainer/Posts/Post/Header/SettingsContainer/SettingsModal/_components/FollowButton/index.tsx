import { follow } from "@/app/(authed-routes)/_globalComponents/SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/follow";
import { sendFollowNotification } from "@/app/(authed-routes)/_globalComponents/SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/sendFollowNotification";
import { unfollow } from "@/app/(authed-routes)/_globalComponents/SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/unfollow";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addToFollowing,
  deleteFromFollowing,
  resetSkip,
} from "@/store/slices/following";
import { togglePostSettingsModal } from "@/store/slices/modals";
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
  const { followings } = useAppSelector((s) => s.following);
  const { socket } = useAppSelector((s) => s.socket);
  const { id } = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const isFollowed = followers.some((follower) => follower.followerId === id);

  useEffect(() => {
    if (isFollowed) dispatch(addToFollowing(userId));
  }, [isFollowed]);

  const isFollowing = followings.includes(userId);

  const followAction = useCallback(async () => {
    setIsLoading(true);
    dispatch(addToFollowing(userId));

    try {
      const { status: followStatus, msg, id: followId } = await follow(userId);
      if (followStatus === "fail") {
        toast.error(msg);
        dispatch(deleteFromFollowing(userId));
        return;
      }

      const { status: followNotificaionStatus, followNotificaion } =
        await sendFollowNotification(userId, followId);
      if (followNotificaionStatus === "fail" || !followNotificaion) return;

      socket?.emit("followNotification", followNotificaion);
      dispatch(resetSkip());
      dispatch(togglePostSettingsModal());
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
      const { status, msg } = await unfollow(userId);
      if (status === "fail") {
        toast.error(msg);
        dispatch(addToFollowing(userId));
      }
      dispatch(resetSkip());
      dispatch(togglePostSettingsModal());
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
