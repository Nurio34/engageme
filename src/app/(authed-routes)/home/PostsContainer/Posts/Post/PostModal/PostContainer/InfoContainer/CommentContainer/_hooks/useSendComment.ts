import { usePostsContext } from "@/app/(authed-routes)/home/PostsContainer/Posts/Context";
import { sendComment } from "@/app/actions/post/comment/sendComment";
import { useActionState, useEffect, useState } from "react";

export const useSendComment = (postId: string) => {
  const { addComment, addReply, setRepliedCommentId } = usePostsContext();

  const [comment, setComment] = useState("");

  const [state, formAction, isPending] = useActionState(sendComment, {
    status: "fail",
    isReply: false,
  });

  useEffect(() => {
    if (state.status === "success") {
      if (state.postComment) addComment(postId, state.postComment);
      if (state.replyComment) {
        addReply(postId, state.replyComment);
        setRepliedCommentId(state.replyComment.commentId);
      }

      setComment("");
    }
  }, [state]);

  return { comment, setComment, formAction, isPending };
};
