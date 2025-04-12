import { Dispatch, SetStateAction, useState } from "react";
import {
  PrismaPostCommentType,
  PrismaPostType,
} from "../../../../../../../prisma/types/post";
import toast from "react-hot-toast";
import { likeComment } from "@/app/actions/post/comment/likeComment";
import { PostCommentLike } from "@prisma/client";
import { removeLike } from "@/app/actions/post/comment/removeLike";

export const usePostComment = (
  setPostsState: Dispatch<SetStateAction<PrismaPostType[]>>,
  postsState: PrismaPostType[],
  userId: string | undefined
) => {
  const [isLoading_LikeComment, setIsLoading_LikeComment] = useState(false);

  const addComment = (postId: string, postComment: PrismaPostCommentType) =>
    setPostsState((prev) =>
      prev.map((postObj) =>
        postObj.id === postId
          ? { ...postObj, comments: [postComment, ...postObj.comments] }
          : postObj
      )
    );

  const isCommentLiked = (postId: string, commentId: string): boolean => {
    const post = postsState.find((postObj) => postObj.id === postId);
    if (!post) return false;

    const comment = post.comments.find(
      (commentObj) => commentObj.id === commentId
    );
    if (!comment) return false;

    return comment.likes.some((likeObj) => likeObj.userId === userId);
  };

  const likeCommentAction = async (postId: string, commentId: string) => {
    try {
      setIsLoading_LikeComment(true);

      const { status, postCommentLike } = await likeComment(commentId);

      if (status === "fail" || !postCommentLike)
        return toast.error(
          "Something went wrong while liking the comment ! Please try again..."
        );

      addLikeToTheComment(postId, commentId, postCommentLike);
    } catch (error) {
      console.log(error);
      toast.error(
        "Unexpected error while liking the comment ! Please try again..."
      );
    } finally {
      setIsLoading_LikeComment(false);
    }
  };

  const addLikeToTheComment = (
    postId: string,
    commentId: string,
    postCommentLike: PostCommentLike
  ) =>
    setPostsState((prev) =>
      prev.map((postObj) =>
        postObj.id === postId
          ? {
              ...postObj,
              comments: postObj.comments.map((commentObj) =>
                commentObj.id === commentId
                  ? {
                      ...commentObj,
                      likes: [...commentObj.likes, postCommentLike],
                    }
                  : commentObj
              ),
            }
          : postObj
      )
    );

  const removeLikeFromTheCommentAction = async (
    postId: string,
    commentId: string
  ) => {
    try {
      setIsLoading_LikeComment(true);

      const { status, postCommentLike } = await removeLike(commentId);
      if (status === "fail" || !postCommentLike)
        return toast.error(
          "Something went wrong while removing likefrom the comment ! Please try again..."
        );

      removeLikeFromTheComment(postId, commentId, postCommentLike);
    } catch (error) {
      console.log(error);
      toast.error(
        "Unexpected error while removing likefrom the comment ! Please try again..."
      );
    } finally {
      setIsLoading_LikeComment(false);
    }
  };

  const removeLikeFromTheComment = (
    postId: string,
    commentId: string,
    postCommentLike: PostCommentLike
  ) =>
    setPostsState((prev) =>
      prev.map((postObj) =>
        postObj.id === postId
          ? {
              ...postObj,
              comments: postObj.comments.map((commentObj) =>
                commentObj.id === commentId
                  ? {
                      ...commentObj,
                      likes: commentObj.likes.filter(
                        (likeObj) => likeObj.id !== postCommentLike.id
                      ),
                    }
                  : commentObj
              ),
            }
          : postObj
      )
    );

  return {
    addComment,
    isCommentLiked,
    likeCommentAction,
    removeLikeFromTheCommentAction,
    isLoading_LikeComment,
  };
};
