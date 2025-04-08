import { useActionState, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { togglePicker } from "@/store/slices/modals";
import EmojiComponent from "./EmojiComponent";
import TextArea from "./TextArea";
import { sendComment } from "@/app/actions/post/comment/sendComment";
import { PrismaPostType } from "../../../../../../../../prisma/types/post";
import ActionIndicator from "./ActionIndicator";
import toast from "react-hot-toast";
import SentComments from "./SentComments";

export type SentCommentType = {
  id: string;
  comment: string;
};

function Client({ post }: { post: PrismaPostType }) {
  const { isPickerOpen } = useAppSelector((s) => s.modals);
  const dispatch = useAppDispatch();

  const [comment, setComment] = useState("");

  const [state, action, isPending] = useActionState(sendComment, {
    status: "pending",
    comment: { id: "", comment },
  });

  const [sentComments, setSentComments] = useState<SentCommentType[]>([]);

  const togglePickerFunction = () => {
    if (isPickerOpen) dispatch(togglePicker());
  };

  useEffect(() => {
    if (state.status === "success") {
      setSentComments((prev) => [...prev, state.comment]);
      setComment("");
      toast.success("Comment sent successfully...");
    }
  }, [state]);

  return (
    <div>
      <SentComments sentComments={sentComments} />
      <form action={action} className="relative flex items-center mt-1">
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
export default Client;
