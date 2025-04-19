import { Dispatch, SetStateAction, useEffect, useState } from "react";
import EmojiContainer from "./EmojiContainer";
import PostButton from "./PostButton";
import { CommentReplyType, usePostsContext } from "../../../../../Context";
import TextArea from "./TextArea";
import { PrismaPostType } from "../../../../../../../../../../../prisma/types/post";
import ActionIndicator from "../../../../AddComment/ActionIndicator";
import { useAppSelector } from "@/store/hooks";
import { useSendComment } from "./_hooks/useSendComment";

function CommentContainer({
  post,
  setTextAreaHeight,
}: {
  post: PrismaPostType;
  setTextAreaHeight: Dispatch<SetStateAction<number>>;
}) {
  const { device } = useAppSelector((s) => s.modals);
  const isDesktop = device.type === "desktop";

  const { commentReply } = usePostsContext();

  //! *** replyToNameState ***
  const [commentReplyState, setCommentReplyState] =
    useState<CommentReplyType>(commentReply);
  const { replyToName, isReply, commentId, replyId, isReplyToReply } =
    commentReplyState;
  useEffect(() => {
    setCommentReplyState(commentReply);
  }, [commentReply.count]);

  useEffect(() => {
    if (replyToName.trim() !== "" && replyToName === commentReply.replyToName)
      setCommentReplyState((prev) => ({ ...prev, isReply: true }));
    else
      setCommentReplyState((prev) => ({
        ...prev,
        isReply: false,
      }));
  }, [replyToName]);

  //! ***********************

  const { comment, setComment, formAction, isPending } = useSendComment(post);

  useEffect(() => {
    if (!isPending)
      setCommentReplyState({
        count: 0,
        isReply: false,
        isReplyToReply: false,
        commentId: "",
        replyToName: "",
        replyId: "",
        commentOwnerId: "",
      });
  }, [isPending]);

  return (
    <form
      action={formAction}
      className="relative border-t-2 px-2 md:px-4 py-3
        flex items-center gap-x-3
      "
    >
      <input type="hidden" name="postId" value={post.id} />
      <input type="hidden" name="isReply" value={isReply ? 1 : 0} />
      <input type="hidden" name="commentId" value={commentId} />
      <input
        type="hidden"
        name="isReplyToReply"
        value={isReplyToReply ? 1 : 0}
      />
      <input type="hidden" name="replyId" value={replyId} />
      <input type="hidden" name="replyToName" value={replyToName} />
      {isDesktop && <EmojiContainer setComment={setComment} />}
      {replyToName && (
        <button
          type="button"
          className="text-sm text-info"
          onClick={() =>
            setCommentReplyState({
              isReply: false,
              isReplyToReply: false,
              commentId: "",
              replyToName: "",
              count: 0,
              replyId: "",
              commentOwnerId: "",
            })
          }
        >
          @{replyToName}
        </button>
      )}

      <TextArea
        comment={comment}
        setComment={setComment}
        setTextAreaHeight={setTextAreaHeight}
        isPending={isPending}
      />
      <PostButton comment={comment} isPending={isPending} />
      <ActionIndicator isPending={isPending} />
    </form>
  );
}
export default CommentContainer;
