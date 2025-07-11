import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addToFollowing,
  deleteFromFollowing,
  resetSkip,
} from "@/store/slices/following";
import { useCallback, useEffect, useState } from "react";
import { follow } from "../../../SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/follow";
import toast from "react-hot-toast";
import { unfollow } from "../../../SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/unfollow";
import { sendFollowNotification } from "../../../SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/sendFollowNotification";

function ActionButtons({
  followers,
  userId,
}: {
  followers: {
    followerId: string;
  }[];
  userId: string;
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
    <div className="flex justify-center gap-x-4 items-center px-4">
      {isFollowing && (
        <button
          type="button"
          className="btn btn-primary btn-sm w-40 hover:scale-105 active:scale-95"
        >
          Message
        </button>
      )}

      {isFollowing ? (
        <button
          type="button"
          className="btn btn-ghost btn-sm w-40 hover:scale-105 active:scale-95"
          onClick={unfollowAction}
          disabled={isLoading || id === userId}
        >
          Following
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-primary btn-sm grow hover:scale-105 active:scale-95"
          onClick={followAction}
          disabled={isLoading || id === userId}
        >
          Follow
        </button>
      )}
    </div>
  );
}
export default ActionButtons;
