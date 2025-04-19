import { Dispatch, SetStateAction } from "react";
import { PrismaPostType } from "../../../../../../../prisma/types/post";
import { PostLike } from "@prisma/client";
import { likeThePost } from "@/app/actions/post/like/likeThePost";
import toast from "react-hot-toast";
import { removeLike } from "@/app/actions/post/like/removeLike";
import { sendPostLikeNotification } from "@/app/actions/notification/like/postLike/sendPostLikeNotification";

export const usePostLike = (
  postsState: PrismaPostType[],
  setPostsState: Dispatch<SetStateAction<PrismaPostType[]>>,
  userId: string
) => {
  async function likeThePostAction(
    postId: string,
    postOwnerId: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) {
    setIsLoading(true);
    const id = crypto.randomUUID();
    const newLike = { id, createdAt: new Date(), postId, userId };
    addLikeToPostLikes(newLike);

    try {
      const { status, postLike } = await likeThePost(postId);

      if (status === "fail" || !postLike) {
        removeLikeFromPostLikes(newLike);

        return toast.error(
          "Something went wrong while liking the post ! Please try again..."
        );
      }

      if (status === "success" && userId !== postOwnerId)
        sendPostLikeNotificationAction(postLike, postOwnerId);
    } catch (error) {
      console.log(error);
      removeLikeFromPostLikes(newLike);

      return toast.error(
        "Unexpected error while liking the post ! Please try again..."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function addLikeToPostLikes(like: PostLike) {
    setPostsState((pre) =>
      pre.map((postObj) =>
        postObj.id === like.postId
          ? { ...postObj, likes: [...postObj.likes, like] }
          : postObj
      )
    );
  }

  async function sendPostLikeNotificationAction(
    postLike: PostLike,
    postOwnerId: string
  ) {
    try {
      const { status, postLikeNotification } = await sendPostLikeNotification(
        postLike,
        postOwnerId
      );

      if (status === "fail" || !postLikeNotification) return;

      //! *** Send real time notification ***
      console.log("send real-time postLikeNotification");
    } catch (error) {
      console.log(error);
    }
  }

  async function removeLikeFromThePostAction(
    like: PostLike,
    postOwnerId: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) {
    setIsLoading(true);
    removeLikeFromPostLikes(like);

    try {
      const { status, postLike } = await removeLike(like.postId);

      if (status === "fail" || !postLike) {
        addLikeToPostLikes(like);
        return toast.error(
          "Something went wrong while removing like from the post ! Please try again..."
        );
      }
    } catch (error) {
      console.log(error);
      addLikeToPostLikes(like);
      return toast.error(
        "Unexpected error while removing like from the post ! Please try again..."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function removeLikeFromPostLikes(like: PostLike) {
    setPostsState((pre) =>
      pre.map((postObj) =>
        postObj.id === like.postId
          ? {
              ...postObj,
              likes: postObj.likes.filter((likeObj) => likeObj.id !== like.id),
            }
          : postObj
      )
    );
  }

  const isPostLiked = (postId: string): boolean => {
    const post = postsState.find((postObj) => postObj.id === postId);
    if (!post) return false;

    return post.likes.some((likeObj) => likeObj.userId === userId);
  };

  return {
    isPostLiked,
    likeThePostAction,
    removeLikeFromThePostAction,
  };
};
