import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToFollowing, deleteFromFollowing } from "@/store/slices/following";
import { useCallback, useEffect, useState } from "react";
import { follow } from "../../../SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/follow";
import toast from "react-hot-toast";
import { unfollow } from "../../../SuggestedForYou/Recomendations/Recomendation/FollowButton/_actions/unfollow";

function ActionButtons({
  followers,
  userId,
}: {
  followers:
    | Pick<
        {
          id: string;
          createdAt: Date;
          followerId: string;
          followingId: string;
        },
        "followingId"
      >[]
    | undefined;
  userId: string;
}) {
  const isFollowingState = !!followers?.length;

  const { id } = useAppSelector((s) => s.user);
  const { followings } = useAppSelector((s) => s.following);
  const isFollowing = followings.includes(userId);

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (isFollowingState) dispatch(addToFollowing(userId));
  }, [isFollowingState]);

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
