import { useAppDispatch } from "@/store/hooks";
import {
  removeFromDeletedReplies,
  setDeletedReplies,
} from "@/store/slices/following";
import toast from "react-hot-toast";
import {
  PrismaPostCommentType,
  PrismaPostType,
  PrismaReplyCommentType,
} from "../../../../../../../../../../../../../../../../../../prisma/types/post";
import { useInfoContext } from "../../../../../../../../Context";
import { deleteReply } from "./_actions/deleteReply";

function DeleteButton({
  postComment,
  reply,
}: {
  postComment: PrismaPostCommentType;
  reply: PrismaReplyCommentType;
}) {
  const dispatch = useAppDispatch();

  const { postsState, setPostsState } = useInfoContext();
  const post = postsState[0];

  const deleteReplyAction = async () => {
    const originalPost = { ...post };

    try {
      const updatedReplies = postComment.replies.filter(
        (r) => r.id !== reply.id
      );

      const updatedComments = post.comments.map((comment) =>
        comment.id === postComment.id
          ? { ...comment, replies: updatedReplies }
          : comment
      );

      const updatedPost: PrismaPostType = {
        ...post,
        comments: updatedComments,
      };

      setPostsState([updatedPost]);
      dispatch(setDeletedReplies(reply.id));

      const { status, msg } = await deleteReply(reply.id);
      if (status === "fail") {
        setPostsState([originalPost]);
        dispatch(removeFromDeletedReplies(reply.id));
        toast.error(msg);
      }
    } catch (error) {
      console.log(error);
      setPostsState([originalPost]);
      dispatch(removeFromDeletedReplies(reply.id));
      toast.error(
        "Unexpected error while deleting the reply! Please try again.."
      );
    }
  };

  return (
    <button
      type="button"
      className="px-1 py-2 h-12 text-sm border-b font-bold text-error"
      onClick={(e) => {
        e.stopPropagation();
        deleteReplyAction();
      }}
    >
      Delete
    </button>
  );
}
export default DeleteButton;
