import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import EmojiContainer from "./EmojiContainer";
import PostButton from "./PostButton";
import { usePostsContext } from "../../../../../Context";
import TextArea from "./TextArea";
import { PrismaPostType } from "../../../../../../../../../../../prisma/types/post";
import ActionIndicator from "../../../../AddComment/ActionIndicator";
import { sendComment } from "@/app/actions/post/comment/sendComment";
import { useAppSelector } from "@/store/hooks";

function CommentContainer({
  post,
  setTextAreaHeight,
}: {
  post: PrismaPostType;
  setTextAreaHeight: Dispatch<SetStateAction<number>>;
}) {
  const { device } = useAppSelector((s) => s.modals);
  const isDesktop = device.type === "desktop";

  const { addComment } = usePostsContext();

  const [comment, setComment] = useState("");
  const [state, formAction, isPending] = useActionState(sendComment, {
    status: "fail",
  });

  useEffect(() => {
    if (state.status === "fail" || !state.postComment) return;

    addComment(post.id, state.postComment);
    setComment("");
  }, [state]);

  return (
    <form
      action={formAction}
      className="relative border-t-2 px-2 md:px-4 py-3
        flex items-center gap-x-3
      "
    >
      <input type="hidden" name="postId" value={post.id} />
      {isDesktop && <EmojiContainer setComment={setComment} />}
      <TextArea
        comment={comment}
        setComment={setComment}
        setTextAreaHeight={setTextAreaHeight}
        isPending={isPending}
      />
      <PostButton comment={comment} />
      <ActionIndicator isPending={isPending} />
    </form>
  );
}
export default CommentContainer;
