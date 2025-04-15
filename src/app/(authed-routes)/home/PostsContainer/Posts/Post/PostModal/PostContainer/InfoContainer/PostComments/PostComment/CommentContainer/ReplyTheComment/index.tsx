import { usePostsContext } from "@/app/(authed-routes)/home/PostsContainer/Posts/Context";

function ReplyTheComment({
  id,
  name,
  isReplyToReply,
}: {
  id: string;
  name: string;
  isReplyToReply: boolean;
}) {
  const { setCommentReply, CommentAreaRef } = usePostsContext();

  return (
    <button
      type="button"
      className="text-sm font-bold text-base-content/70"
      onClick={() => {
        setCommentReply((pre) => ({
          isReply: true,
          replyToId: id,
          replyToName: name,
          isReplyToReply,
          count: pre.count + 1,
        }));
        if (CommentAreaRef.current) CommentAreaRef.current.focus();
      }}
    >
      Reply
    </button>
  );
}
export default ReplyTheComment;
