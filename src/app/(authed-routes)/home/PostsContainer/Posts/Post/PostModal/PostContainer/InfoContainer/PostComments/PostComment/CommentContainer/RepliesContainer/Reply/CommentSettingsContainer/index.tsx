import { useState } from "react";
import OpenCommentSettingsModalButton from "./OpenCommentSettingsModalButton";
import CommentSettingsModal from "./CommentSettingsModal";
import {
  PrismaPostCommentType,
  PrismaReplyCommentType,
} from "../../../../../../../../../../../../../../../../prisma/types/post";

function CommentSettingsContainer({
  postComment,
  reply,
}: {
  postComment: PrismaPostCommentType;
  reply: PrismaReplyCommentType;
}) {
  const [isCommentSettingsModalOpen, setIsCommentSettingsModalOpen] =
    useState(false);

  return (
    <div>
      {isCommentSettingsModalOpen && (
        <CommentSettingsModal
          postComment={postComment}
          reply={reply}
          setIsCommentSettingsModalOpen={setIsCommentSettingsModalOpen}
        />
      )}
      <OpenCommentSettingsModalButton
        setIsCommentSettingsModalOpen={setIsCommentSettingsModalOpen}
      />
    </div>
  );
}
export default CommentSettingsContainer;
