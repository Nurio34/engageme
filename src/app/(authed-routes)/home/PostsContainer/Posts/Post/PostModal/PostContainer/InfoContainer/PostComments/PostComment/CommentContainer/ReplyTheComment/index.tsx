import { usePostsContext } from "@/app/(authed-routes)/home/PostsContainer/Posts/Context";
import { useAppSelector } from "@/store/hooks";

function ReplyTheComment({
  commentId,
  name,
  isReplyToReply,
  replyOwnerId,
}: {
  commentId: string;
  name: string;
  isReplyToReply: boolean;
  replyOwnerId?: string;
}) {
  const { id } = useAppSelector((s) => s.user);
  const isSelfReply = replyOwnerId === id;

  const { setCommentReply, CommentAreaRef } = usePostsContext();

  return (
    !isSelfReply && (
      <button
        type="button"
        className="text-sm font-bold text-base-content/70"
        onClick={() => {
          setCommentReply((pre) => ({
            isReply: true,
            replyToId: commentId,
            replyToName: name,
            isReplyToReply,
            count: pre.count + 1,
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
