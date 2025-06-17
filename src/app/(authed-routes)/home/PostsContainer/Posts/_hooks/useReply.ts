import { Dispatch, SetStateAction, useRef, useState } from "react";
import { CommentReplyType } from "../Context";
import {
  PrismaPostType,
  PrismaReplyCommentType,
  PrismaReplyLikeType,
} from "../../../../../../../prisma/types/post";
import { likeReply } from "@/app/actions/post/reply/likeReply";
import toast from "react-hot-toast";
import { ReplyCommentLike, User } from "@prisma/client";
import { removeLikeFromReply } from "@/app/actions/post/reply/removeLikeFromReply";
import { sendReplyLikeNotification } from "@/app/actions/notification/reply/sendReplyLikeNotificationAction";
import { useAppSelector } from "@/store/hooks";

export const useReply = (
  setPostsState: Dispatch<SetStateAction<PrismaPostType[]>>,
  userId: string,
  postsState: PrismaPostType[]
) => {
  const { socket } = useAppSelector((s) => s.socket);

  const CommentAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [commentReply, setCommentReply] = useState<CommentReplyType>({
    isReply: false,
    commentId: "",
    replyToName: "",
    isReplyToReply: false,
    count: 0,
    replyId: "",
    commentOwnerId: "",
  });

  const [repliedCommentId, setRepliedCommentId] = useState("");
  const addReply = (postId: string, replyComment: PrismaReplyCommentType) =>
    setPostsState((prev) =>
      prev.map((postObj) =>
        postObj.id === postId
          ? {
              ...postObj,
              comments: postObj.comments.map((commentObj) =>
                commentObj.id === replyComment.commentId
                  ? {
                      ...commentObj,
                      replies: [...commentObj.replies, replyComment],
                    }
                  : commentObj
              ),
            }
          : postObj
      )
    );

  const likeTheReplyAction = async (
    postId: string,
    commentId: string,
    replyId: string,
    replyOwnerId: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    const id = crypto.randomUUID();
    const newReplyLike = {
      id,
      userId,
      commentId,
      user: {} as User,
    };

    addLikeToReplyState(postId, commentId, replyId, newReplyLike);
    setIsLoading(true);

    try {
      const { status, replyLike } = await likeReply(replyId);

      if (status === "fail" || !replyLike) {
        removeLikeFromReplyState(postId, commentId, replyId, newReplyLike);
        return toast.error(
          "Something went wrong while liking the reply ! Please try again..."
        );
      }

      sendReplyLikeNotificationAction(replyOwnerId, replyLike.id);
    } catch (error) {
      console.log(error);
      removeLikeFromReplyState(postId, commentId, replyId, newReplyLike);
      toast.error(
        "Unexpected error while liking the reply ! Please try again..."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addLikeToReplyState = (
    postId: string,
    commentId: string,
    replyId: string,
    replyLike: PrismaReplyLikeType
  ) => {
    setPostsState((prev) =>
      prev.map((postObj) =>
        postObj.id === postId
          ? {
              ...postObj,
              comments: postObj.comments.map((commentObj) =>
                commentObj.id === commentId
                  ? {
                      ...commentObj,
                      replies: commentObj.replies.map((replyObj) =>
                        replyObj.id === replyId
                          ? {
                              ...replyObj,
                              likes: [...replyObj.likes, replyLike],
                            }
                          : replyObj
                      ),
                    }
                  : commentObj
              ),
            }
          : postObj
      )
    );
  };

  const sendReplyLikeNotificationAction = async (
    replyOwnerId: string,
    commentLikeId: string
  ) => {
    if (replyOwnerId === userId) return;

    try {
      const { status, replyLikeNotification } = await sendReplyLikeNotification(
        replyOwnerId,
        commentLikeId
      );

      if (status === "success" && replyLikeNotification) {
        socket?.emit("replyLikeNotification", {
          replyOwnerId,
          replyLikeNotification,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLikeFromReplyAction = async (
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    postId: string,
    commentId: string,
    replyId: string,
    like: PrismaReplyLikeType
  ) => {
    try {
      setIsLoading(true);
      removeLikeFromReplyState(postId, commentId, replyId, like);

      const { status, replyLike } = await removeLikeFromReply(replyId);
      if (status === "fail" || !replyLike) {
        addLikeToReplyState(postId, commentId, replyId, like);
        return toast.error(
          "Something went wrong while removing likefrom the comment ! Please try again..."
        );
      }
    } catch (error) {
      console.log(error);
      addLikeToReplyState(postId, commentId, replyId, like);

      toast.error(
        "Unexpected error while removing likefrom the comment ! Please try again..."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const removeLikeFromReplyState = (
    postId: string,
    commentId: string,
    replyId: string,
    replyLike: ReplyCommentLike
  ) => {
    setPostsState((prev) =>
      prev.map((postObj) =>
        postObj.id === postId
          ? {
              ...postObj,
              comments: postObj.comments.map((commentObj) =>
                commentObj.id === commentId
                  ? {
                      ...commentObj,
                      replies: commentObj.replies.map((replyObj) =>
                        replyObj.id === replyId
                          ? {
                              ...replyObj,
                              likes: replyObj.likes.filter(
                                (likeObj) => likeObj.id !== replyLike.id
                              ),
                            }
                          : replyObj
                      ),
                    }
                  : commentObj
              ),
            }
          : postObj
      )
    );
  };

  const isReplyLiked = (postId: string, commentId: string, replyId: string) => {
    const post = postsState.find((postObj) => postObj.id === postId);

    if (!post) return;
    const comment = post.comments.find(
      (commenObj) => commenObj.id === commentId
    );

    if (!comment) return;
    const reply = comment.replies.find((replyObj) => replyObj.id === replyId);
    if (!reply) return;
    return reply.likes.some((likeObj) => likeObj.userId === userId);
  };

  return {
    setCommentReply,
    setRepliedCommentId,
    CommentAreaRef,
    commentReply,
    repliedCommentId,
    addReply,
    isReplyLiked,
    likeTheReplyAction,
    removeLikeFromReplyAction,
  };
};
