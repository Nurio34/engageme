import { useState } from "react";
import { PrismaPostCommentType } from "../../../../../../../../../../../../../../prisma/types/post";
import OpenCommentSettingsModalButton from "./OpenCommentSettingsModalButton";
import CommentSettingsModal from "./CommentSettingsModal";

function CommentSettingsContainer({
  postComment,
}: {
  postComment: PrismaPostCommentType;
}) {
  const [isCommentSettingsModalOpen, setIsCommentSettingsModalOpen] =
    useState(false);

  return (
    <div>
      {isCommentSettingsModalOpen && (
        <CommentSettingsModal
          postComment={postComment}
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
