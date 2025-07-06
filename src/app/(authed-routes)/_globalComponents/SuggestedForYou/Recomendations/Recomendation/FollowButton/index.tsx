import { useCallback, useState } from "react";
import { follow } from "./_actions/follow";
import { unfollow } from "./_actions/unfollow";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToFollowing, deleteFromFollowing } from "@/store/slices/following";
import { sendFollowNotification } from "./_actions/sendFollowNotification";

function FollowButton({ userId }: { userId: string }) {
  const { followings } = useAppSelector((s) => s.following);
  const { socket } = useAppSelector((s) => s.socket);
  const dispatch = useAppDispatch();

  const isFollowing = followings.includes(userId);
  const [isLoading, setIsLoading] = useState(false);

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
      id={userId}
      type="button"
      className="w-full border-t text-center text-sm py-3 text-primary font-medium underline-offset-2 hover:underline"
      onClick={isFollowing ? unfollowAction : followAction}
      disabled={isLoading}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}

export default FollowButton;
