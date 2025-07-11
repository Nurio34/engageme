import { useAppDispatch } from "@/store/hooks";
import { PrismaPostCommentType } from "../../../../../../../../../../../../../../../../prisma/types/post";
import { useInfoContext } from "../../../../../../Context";
import {
  removeFromDeletedComments,
  setDeletedComments,
} from "@/store/slices/following";
import { deleteComment } from "./_actions/deleteComment";
import toast from "react-hot-toast";

function DeleteButton({ postComment }: { postComment: PrismaPostCommentType }) {
  const dispatch = useAppDispatch();

  const { postsState, setPostsState } = useInfoContext();
  const post = postsState[0];

  const deleteCommentAction = async () => {
    const originalPost = { ...post };

    try {
      const updatedComments = post.comments.filter(
        (comment) => comment.id !== postComment.id
      );

      const updatedPost = {
        ...post,
        comments: updatedComments,
      };

      setPostsState([updatedPost]);

      dispatch(
        setDeletedComments({ postId: post.id, commentId: postComment.id })
      );

      const { status, msg } = await deleteComment(postComment.id);

      if (status === "fail") {
        setPostsState([originalPost]);
        dispatch(
          removeFromDeletedComments({
            postId: post.id,
            commentId: postComment.id,
          })
        );
        toast.error(msg);
      }
    } catch (error) {
      console.log(error);
      setPostsState([originalPost]);
      dispatch(
        removeFromDeletedComments({
          postId: post.id,
          commentId: postComment.id,
        })
      );
      toast.error(
        "Unexpected error while deleting the comment! Please try again.."
      );
    }
  };

  return (
    <button
      type="button"
      className="px-1 py-2 h-12 text-sm border-b font-bold text-error"
      onClick={(e) => {
        e.stopPropagation();
        deleteCommentAction();
      }}
    >
      Delete
    </button>
  );
}
export default DeleteButton;
