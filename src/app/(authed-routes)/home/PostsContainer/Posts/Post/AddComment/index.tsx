import { useActionState, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { togglePicker } from "@/store/slices/modals";
import EmojiComponent from "./EmojiComponent";
import TextArea from "./TextArea";
import {
  PrismaPostCommentType,
  PrismaPostType,
} from "../../../../../../../../prisma/types/post";
import ActionIndicator from "./ActionIndicator";
import SentComments from "./SentComments";
import { usePostsContext } from "../../Context";
import { sendComment } from "@/app/actions/post/comment/sendComment";

function AddComment({ post }: { post: PrismaPostType }) {
  const { isPickerOpen } = useAppSelector((s) => s.modals);

  const dispatch = useAppDispatch();

  const { addComment } = usePostsContext();

  const [comment, setComment] = useState("");
  const [state, formAction, isPending] = useActionState(sendComment, {
    status: "fail",
  });
  const [sentComments, setSentComments] = useState<PrismaPostCommentType[]>([]);

  useEffect(() => {
    if (state.status === "fail" || !state.postComment) return;

    addComment(post.id, state.postComment);
    setSentComments((prev) => [...prev, state.postComment!]);
    setComment("");

    if (isPickerOpen) dispatch(togglePicker());
  }, [state]);

  const togglePickerFunction = () => {
    if (isPickerOpen) dispatch(togglePicker());
  };

  return (
    <div>
      <SentComments sentComments={sentComments} post={post} />
      <form action={formAction} className="relative flex items-center mt-1">
        <input type="hidden" name="postId" value={post.id} />
        <TextArea
          togglePickerFunction={togglePickerFunction}
          comment={comment}
          setComment={setComment}
          isPending={isPending}
        />
        <EmojiComponent
          comment={comment}
          setComment={setComment}
          isPending={isPending}
        />
        <ActionIndicator isPending={isPending} />
      </form>
    </div>
  );
}
export default AddComment;
