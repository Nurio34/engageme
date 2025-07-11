import { Dispatch, SetStateAction } from "react";
import {
  PrismaCommentLikeType,
  PrismaPostCommentType,
  PrismaPostType,
} from "../../../../../../../prisma/types/post";
import toast from "react-hot-toast";
import { likeComment } from "@/app/actions/post/comment/likeComment";
import { PostCommentLike, User } from "@prisma/client";
import { removeLikeFromComment } from "@/app/actions/post/comment/removeLikeFromComment";
import { sendCommentLikeNotification } from "@/app/actions/notification/comment/sendCommentLikeNotification";
import { useAppSelector } from "@/store/hooks";

export const usePostComment = (
  setPostsState: Dispatch<SetStateAction<PrismaPostType[]>>,
  postsState: PrismaPostType[],
  userId: string
) => {
  const { socket } = useAppSelector((s) => s.socket);

  const addComment = (postId: string, postComment: PrismaPostCommentType) =>
    setPostsState((prev) =>
      prev.map((postObj) =>
        postObj.id === postId
          ? { ...postObj, comments: [postComment, ...postObj.comments] }
          : postObj
      )
    );

  const likeCommentAction = async (
    postId: string,
    commentId: string,
    commentOwnerId: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    const id = crypto.randomUUID();
    const newCommentLike = {
      id,
      userId,
      commentId,
      user: {} as User,
    };
    addLikeToTheComment(postId, commentId, newCommentLike);

    try {
      setIsLoading(true);

      const { status, postCommentLike, message } = await likeComment(commentId);

      if (status === "fail" || !postCommentLike) {
        removeLikeFromTheComment(postId, commentId, newCommentLike);
        return toast.error(message);
      }

      if (commentOwnerId !== userId)
        sendCommentLikeNotificationAction(commentOwnerId, postCommentLike.id);
    } catch (error) {
      console.log(error);
      removeLikeFromTheComment(postId, commentId, newCommentLike);
      toast.error(
        "Unexpected error while liking the comment ! Please try again..."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addLikeToTheComment = (
    postId: string,
    commentId: string,
    postCommentLike: PrismaCommentLikeType
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

  const sendCommentLikeNotificationAction = async (
    commentOwnerId: string,
    commentLikeId: string
  ) => {
    try {
      const { status, postCommentLikeNotification } =
        await sendCommentLikeNotification(commentOwnerId, commentLikeId);

      if (status === "success" && postCommentLikeNotification) {
        socket?.emit("commentLikeNotification", {
          commentOwnerId,
          postCommentLikeNotification,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLikeFromTheCommentAction = async (
    postId: string,
    commentLike: PrismaCommentLikeType,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    const { commentId } = commentLike;

    try {
      setIsLoading(true);
      removeLikeFromTheComment(postId, commentId, commentLike);

      const { status, postCommentLike } = await removeLikeFromComment(
        commentId
      );
      if (status === "fail" || !postCommentLike) {
        addLikeToTheComment(postId, commentId, commentLike);
        return toast.error(
          "Something went wrong while removing likefrom the comment ! Please try again..."
        );
      }
    } catch (error) {
      console.log(error);
      addLikeToTheComment(postId, commentId, commentLike);

      toast.error(
        "Unexpected error while removing likefrom the comment ! Please try again..."
      );
    } finally {
      setIsLoading(false);
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

  const isCommentLiked = (postId: string, commentId: string): boolean => {
    const post = postsState.find((postObj) => postObj.id === postId);
    if (!post) return false;

    const comment = post.comments.find(
      (commentObj) => commentObj.id === commentId
    );
    if (!comment) return false;

    return comment.likes.some((likeObj) => likeObj.userId === userId);
  };

  return {
    addComment,
    isCommentLiked,
    likeCommentAction,
    removeLikeFromTheCommentAction,
  };
};
