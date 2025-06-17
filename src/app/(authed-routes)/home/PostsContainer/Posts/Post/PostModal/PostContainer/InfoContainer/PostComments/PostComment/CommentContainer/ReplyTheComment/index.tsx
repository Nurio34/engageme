import { useAppSelector } from "@/store/hooks";
import { PrismaReplyCommentType } from "../../../../../../../../../../../../../../prisma/types/post";
import { useInfoContext } from "../../../../Context";

function ReplyTheComment({
  commentId,
  commentOwnerId,
  name,
  isReplyToReply,
  reply,
}: {
  commentId: string;
  commentOwnerId: string;
  name: string;
  isReplyToReply: boolean;
  reply?: PrismaReplyCommentType;
}) {
  const { id } = useAppSelector((s) => s.user);
  const isSelfReply = reply?.userId === id;

  const { setCommentReply, CommentAreaRef } = useInfoContext();

  return (
    !isSelfReply && (
      <button
        type="button"
        className="text-sm font-bold text-base-content/70"
        onClick={() => {
          setCommentReply((pre) => ({
            isReply: true,
            commentId,
            replyToName: name,
            isReplyToReply,
            count: pre.count + 1,
            replyId: reply?.id || "",
            commentOwnerId,
          }));
          if (CommentAreaRef.current) CommentAreaRef.current.focus();
        }}
      >
        Reply
      </button>
    )
  );
}
export default ReplyTheComment;
