import { useObserveVisibility } from "@/hooks/useObserveVisibility";
import { PrismaPostCommentType } from "../../../../../../../../../../../../prisma/types/post";
import Avatar from "../../_components/Avatar";
import CommentContainer from "./CommentContainer";
import RepliesContainer from "./CommentContainer/RepliesContainer";
import LikeTheCommentButton from "./LikeTheCommentButton";
import dynamic from "next/dynamic";
import { RefObject, useState } from "react";

const UserModal = dynamic(
  () => import("@/app/(authed-routes)/_globalComponents/UserModal")
);

function PostComment({
  postComment,
  ScrollableContainerRef,
}: {
  postComment: PrismaPostCommentType;
  ScrollableContainerRef: RefObject<HTMLUListElement | null>;
}) {
  const { containerRef, isVisible } = useObserveVisibility();
  const [isContainerHovered, setIsContainerHovered] = useState(false);
  return (
    <li className="py-3">
      <div
        ref={containerRef}
        className="grid grid-cols-[auto,1fr,auto] items-start gap-x-1 lg:gap-x-3 pr-2 lg:pr-0"
      >
        <Avatar
          name={postComment.user.name}
          avatar={postComment.user.avatar}
          setIsContainerHovered={setIsContainerHovered}
          ScrollableContainerRef={ScrollableContainerRef}
        />
        <CommentContainer
          postComment={postComment}
          setIsContainerHovered={setIsContainerHovered}
          ScrollableContainerRef={ScrollableContainerRef}
        />
        <LikeTheCommentButton postComment={postComment} />
        <RepliesContainer
          postComment={postComment}
          ScrollableContainerRef={ScrollableContainerRef}
        />
        {isVisible && (
          <UserModal
            userId={postComment.userId}
            isContainerHovered={isContainerHovered}
            setIsContainerHovered={setIsContainerHovered}
          />
        )}
      </div>
    </li>
  );
}
export default PostComment;
