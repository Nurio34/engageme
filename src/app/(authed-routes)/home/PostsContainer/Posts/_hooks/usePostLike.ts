import { Dispatch, SetStateAction, useState } from "react";
import { PrismaPostType } from "../../../../../../../prisma/types/post";
import { PostLike } from "@prisma/client";
import { likeThePost } from "@/app/actions/post/like/likeThePost";
import toast from "react-hot-toast";
import { removeLike } from "@/app/actions/post/like/removeLike";

export const usePostLike = (
  postsState: PrismaPostType[],
  setPostsState: Dispatch<SetStateAction<PrismaPostType[]>>,
  userId: string | undefined
) => {
  const [isLoading_LikePost, setIsLoading_LikePost] = useState(false);

  const likeThePostAction = async (postId: string) => {
    setIsLoading_LikePost(true);
    try {
      const { status, postLike } = await likeThePost(postId);

      if (status === "fail" || !postLike)
        return toast.error(
          "Something went wrong while liking the post ! Please try again..."
        );

      addLikeToPostLikes(postLike);
    } catch (error) {
      console.log(error);
      return toast.error(
        "Unexpected error while liking the post ! Please try again..."
      );
    } finally {
      setIsLoading_LikePost(false);
    }
  };

  const addLikeToPostLikes = (like: PostLike) =>
    setPostsState((pre) =>
      pre.map((postObj) =>
        postObj.id === like.postId
          ? { ...postObj, likes: [...postObj.likes, like] }
          : postObj
      )
    );

  const removeLikeFromThePostAction = async (postId: string) => {
    setIsLoading_LikePost(true);
    try {
      const { status, postLike } = await removeLike(postId);

      if (status === "fail" || !postLike)
        return toast.error(
          "Something went wrong while removing like from the post ! Please try again..."
        );

      removeLikeFromPostLikes(postLike);
    } catch (error) {
      console.log(error);
      return toast.error(
        "Unexpected error while removing like from the post ! Please try again..."
      );
    } finally {
      setIsLoading_LikePost(false);
    }
  };

  const removeLikeFromPostLikes = (like: PostLike) =>
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

  const isPostLiked = (postId: string): boolean => {
    const post = postsState.find((postObj) => postObj.id === postId);
    if (!post) return false;

    return post.likes.some((likeObj) => likeObj.userId === userId);
  };

  return {
    isPostLiked,
    likeThePostAction,
    removeLikeFromThePostAction,
    isLoading_LikePost,
  };
};
