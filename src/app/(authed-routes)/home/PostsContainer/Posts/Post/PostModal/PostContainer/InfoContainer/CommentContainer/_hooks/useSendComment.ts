import { usePostsContext } from "@/app/(authed-routes)/home/PostsContainer/Posts/Context";
import { sendComment } from "@/app/actions/post/comment/sendComment";
import { useActionState, useEffect, useState } from "react";
import { PrismaPostType } from "../../../../../../../../../../../../prisma/types/post";
import { useAppSelector } from "@/store/hooks";
import { sendPostCommentNotification } from "@/app/actions/notification/comment/sendPostCommentNotification";

export const useSendComment = (post: PrismaPostType) => {
  const { id: userId } = useAppSelector((s) => s.user);

  const { addComment, addReply, setRepliedCommentId } = usePostsContext();

  const [comment, setComment] = useState("");

  const [state, formAction, isPending] = useActionState(sendComment, {
    status: "fail",
    isReply: false,
  });

  useEffect(() => {
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

            if (status === "fail" || !postCommentNotification) return;

            //! *** send real-time postCommentNotification ***
            console.log({ postCommentNotification });
          } catch (error) {
            console.log(error);
          }
        };

        sendPostCommentNotificationAction();
      }
      if (state.replyComment) {
        addReply(post.id, state.replyComment);
        setRepliedCommentId(state.replyComment.commentId);
      }

      setComment("");
    }
  }, [state]);

  return { comment, setComment, formAction, isPending };
};
