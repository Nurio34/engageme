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
import { sendPostCommentNotification } from "@/app/actions/notification/comment/sendPostCommentNotification";
import toast from "react-hot-toast";

function AddComment({ post }: { post: PrismaPostType }) {
  const { isPickerOpen } = useAppSelector((s) => s.modals);
  const { id: userId } = useAppSelector((s) => s.user);
  const { socket } = useAppSelector((s) => s.socket);

  const dispatch = useAppDispatch();

  const { addComment } = usePostsContext();

  const [comment, setComment] = useState("");
  const [state, formAction, isPending] = useActionState(sendComment, {
    status: "pending",
    isReply: false,
  });
  const [sentComments, setSentComments] = useState<PrismaPostCommentType[]>([]);

  useEffect(() => {
    if (state.status === "pending") return;

    if (state.status === "fail" || !state.postComment) {
      toast.error(
        "Something went wrong while commenting ! Please try again..."
      );
      return;
    }

    addComment(post.id, state.postComment);
    setSentComments((prev) => [...prev, state.postComment!]);
    setComment("");
    if (isPickerOpen) dispatch(togglePicker());

    const sendPostCommentNotificationAction = async () => {
      if (post.userId === userId || !state.postComment) return;

      try {
        const { status, postCommentNotification } =
          await sendPostCommentNotification(post.userId, state.postComment.id);

        if (status === "fail" || !postCommentNotification) return;

        //! *** send real-time postCommentNotification ***
        socket?.emit("postCommentNotification", {
          postOwnerId: post.userId,
          postCommentNotification,
        });
      } catch (error) {
        console.log(error);
      }
    };

    sendPostCommentNotificationAction();
  }, [state]);

  const togglePickerFunction = () => {
    if (isPickerOpen) dispatch(togglePicker());
  };

  return (
    <div>
      <SentComments sentComments={sentComments} post={post} />
      <form action={formAction} className="relative flex items-end mt-1">
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
