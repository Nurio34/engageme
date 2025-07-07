import Link from "next/link";
import { User } from "../../../../../../types";
import { fancyTime } from "@/utils/fancyTime";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useEffect, useState } from "react";
import {
  addToFollowing,
  deleteFromFollowing,
  resetSkip,
} from "@/store/slices/following";
import { follow } from "@/app/(authed-routes)/_globalComponents/SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/follow";
import toast from "react-hot-toast";
import { sendFollowNotification } from "@/app/(authed-routes)/_globalComponents/SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/sendFollowNotification";
import { unfollow } from "@/app/(authed-routes)/_globalComponents/SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/unfollow";
import { setCurrentMenu } from "@/store/slices/sidemenu";

function FollowNotification({
  users,
  createdAt,
  isFollowed,
}: {
  users: User[];
  createdAt: Date;
  isFollowed: boolean | undefined;
}) {
  const { name, userId } = users[0];

  const { followings } = useAppSelector((s) => s.following);
  const { socket } = useAppSelector((s) => s.socket);
  const dispatch = useAppDispatch();

  const isFollowing = followings.includes(userId);
  const [isLoading, setIsLoading] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isFollowed) dispatch(addToFollowing(userId));
  }, [isFollowed]);

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
    <>
      <span>
        <Link
          href={`/${name}`}
          className="font-bold"
          onClick={() => dispatch(setCurrentMenu(undefined))}
          onMouseEnter={() => setIsHovered(true)}
          prefetch={isHovered}
        >
          {name}
        </Link>{" "}
        started following you.{" "}
      </span>
      <span className="text-base-content/50">{fancyTime(createdAt).short}</span>
      <button
        type="button"
        className={`btn btn-sm hover:scale-105 active:scale-95 ml-1 my-1
            ${isFollowing ? "" : "btn-primary"}    
        `}
        onClick={isFollowing ? unfollowAction : followAction}
        disabled={isLoading}
      >
        {isFollowing ? "Following" : "Follow Back"}
      </button>
    </>
  );
}
export default FollowNotification;
