import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
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

  const { commentReply, CommentAreaRef } = usePostsContext();

  //! *** replyToNameState ***
  const [commentReplyState, setCommentReplyState] =
    useState<CommentReplyType>(commentReply);
  const { replyToName, isReply, replyToId } = commentReplyState;
  const ReplyToNameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setCommentReplyState(commentReply);
  }, [commentReply.count]);

  useEffect(() => {
    if (replyToName?.length === 0 && CommentAreaRef.current)
      CommentAreaRef.current.focus();
  }, [replyToName]);

  useEffect(() => {
    if (replyToName !== undefined && replyToName === commentReply.replyToName)
      setCommentReplyState((prev) => ({ ...prev, isReply: true }));
    else
      setCommentReplyState((prev) => ({
        ...prev,
        isReply: false,
      }));
  }, [replyToName]);

  //! ***********************

  const { comment, setComment, formAction, isPending } = useSendComment(
    post.id
  );

  return (
    <form
      action={formAction}
      className="relative border-t-2 px-2 md:px-4 py-3
        flex items-center gap-x-3
      "
    >
      <input type="hidden" name="postId" value={post.id} />
      <input type="hidden" name="isReply" value={isReply ? 1 : 0} />
      <input type="hidden" name="replyToId" value={replyToId} />
      {isDesktop && <EmojiContainer setComment={setComment} />}
      {replyToName && (
        <div className="float-start flex items-center">
          <span
            className={`${
              replyToName === commentReply.replyToName ? "text-info" : ""
            }`}
          >
            @
          </span>
          <input
            ref={ReplyToNameRef}
            type="text"
            name="replyToName"
            id="replyToName"
            autoCorrect="off"
            className={`outline-none ${
              replyToName === commentReply.replyToName ? "text-info" : ""
            }`}
            style={{
              width: `${replyToName && replyToName.length}ch`,
            }}
            value={`${replyToName}`}
            onInput={(e: FormEvent<HTMLInputElement>) => {
              const nativeEvent = e.nativeEvent as InputEvent;
              const inputType = nativeEvent.inputType;

              if (inputType === "deleteContentBackward") {
                setCommentReplyState((prev) => ({
                  ...prev,
                  replyToName: prev.replyToName?.slice(
                    0,
                    prev.replyToName.length - 1
                  ),
                }));
                return;
              }

              const value = e.currentTarget.value;
              if (
                commentReply.replyToName === replyToName &&
                CommentAreaRef.current
              ) {
                CommentAreaRef.current.focus();
                setComment((prev) => prev + nativeEvent.data!);
              } else
                setCommentReplyState((prev) => ({
                  ...prev,
                  replyToName: value,
                }));
            }}
          />
        </div>
      )}

      <TextArea
        comment={comment}
        setComment={setComment}
        setTextAreaHeight={setTextAreaHeight}
        isPending={isPending}
        ReplyToNameRef={ReplyToNameRef}
      />
      <PostButton comment={comment} isPending={isPending} />
      <ActionIndicator isPending={isPending} />
    </form>
  );
}
export default CommentContainer;
