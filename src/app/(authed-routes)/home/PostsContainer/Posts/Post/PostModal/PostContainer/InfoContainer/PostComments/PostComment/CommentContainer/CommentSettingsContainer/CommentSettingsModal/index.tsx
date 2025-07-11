import { useAppSelector } from "@/store/hooks";
import { PrismaPostCommentType } from "../../../../../../../../../../../../../../../prisma/types/post";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { FaCircleInfo } from "react-icons/fa6";
import DeleteButton from "./DeleteButton";

function CommentSettingsModal({
  postComment,
  setIsCommentSettingsModalOpen,
}: {
  postComment: PrismaPostCommentType;
  setIsCommentSettingsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = postComment;
  const { id: userId } = useAppSelector((s) => s.user);

  const isSelfComment = user.userId === userId;

  return (
    <div
      className="fixed z-10 top-0 left-0 w-screen h-screen bg-base-content/80
            flex justify-center items-center
        "
      onClick={() => setIsCommentSettingsModalOpen(false)}
    >
      <div
        className="w-screen max-w-[560px] bg-base-100 rounded-2xl
            grid
        "
      >
        {!isSelfComment && (
          <button
            type="button"
            className="px-1 py-2 h-12 text-sm border-b font-bold text-error"
            onClick={(e) => {
              e.stopPropagation();
              toast("This feature is under development !", {
                className: "text-center",
                icon: <FaCircleInfo className="text-4xl text-info" />,
              });
            }}
          >
            Report
          </button>
        )}
        <DeleteButton postComment={postComment} />
        <button type="button" className="px-1 py-2 h-12 text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}
export default CommentSettingsModal;
