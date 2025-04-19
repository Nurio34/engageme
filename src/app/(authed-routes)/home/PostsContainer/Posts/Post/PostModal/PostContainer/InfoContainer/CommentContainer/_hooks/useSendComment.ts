import { usePostsContext } from "@/app/(authed-routes)/home/PostsContainer/Posts/Context";
import { sendComment } from "@/app/actions/post/comment/sendComment";
import { useActionState, useEffect, useState } from "react";
import { PrismaPostType } from "../../../../../../../../../../../../prisma/types/post";
import { useAppSelector } from "@/store/hooks";
import { sendPostCommentNotification } from "@/app/actions/notification/comment/sendPostCommentNotification";
import toast from "react-hot-toast";
import { sendReplyNotification } from "@/app/actions/notification/reply/sendReplyNotification";

export const useSendComment = (post: PrismaPostType) => {
  const { id: userId } = useAppSelector((s) => s.user);

  const { addComment, addReply, setRepliedCommentId, commentReply } =
    usePostsContext();

  const [comment, setComment] = useState("");

  const [state, formAction, isPending] = useActionState(sendComment, {
    status: "pending",
    isReply: false,
  });

  useEffect(() => {
    if (state.status === "pending") return;

    if (state.status === "fail") {
      toast.error("Something went wrong while commenting ! Please try again..");
      return;
    }

    if (state.status === "success") {
      if (state.postComment) {
        addComment(post.id, state.postComment);

        const sendPostCommentNotificationAction = async () => {
          if (post.userId === userId || !state.postComment) return;

          try {
            const { status, postCommentNotification } =
              await sendPostCommentNotification(
                post.userId,
                state.postComment.id
              );

            if (status === "success" || postCommentNotification) {
              //! *** send real-time postCommentNotification ***
              console.log("send real-time postCommentNotification");
            }
          } catch (error) {
            console.log(error);
          }
        };

        sendPostCommentNotificationAction();
      }
      if (state.replyComment) {
        addReply(post.id, state.replyComment);
        setRepliedCommentId(state.replyComment.commentId);

        const sendReplyCommentNotificationAction = async () => {
          if (commentReply.commentOwnerId === userId || !state.replyComment)
            return;

          try {
            const { status, replyNotification } = await sendReplyNotification(
              commentReply.commentOwnerId,
              state.replyComment.id
            );

            if (status === "success" || replyNotification) {
              //! *** send real-time replyCommentNotification ***
              console.log("send real-time replyCommentNotification");
            }
          } catch (error) {
            console.log(error);
          }
        };

        sendReplyCommentNotificationAction();
      }

      setComment("");
    }
  }, [state]);

  return { comment, setComment, formAction, isPending };
};
