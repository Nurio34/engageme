import {
  PrismaPostCommentType,
  PrismaReplyCommentType,
} from "../../../../../../../../../../../../../../../prisma/types/post";
import TotalCommentLikes from "../../TotalCommentLikes";
import ReplyTheComment from "../../ReplyTheComment";
import LikeReplyButton from "./LikeTReplyButton";
import Avatar from "../../../../../_components/Avatar";
import CreatedAt from "../../../../../_components/CreatedAt";
import Name from "../../../../../_components/Name";
import { useObserveVisibility } from "@/hooks/useObserveVisibility";
import { RefObject, useState } from "react";
import dynamic from "next/dynamic";
import { PrismaRecomendationType } from "../../../../../../../../../../../../../../../prisma/types/recomendation";
import { useInfoContext } from "../../../../../Context";
import CommentSettingsContainer from "./CommentSettingsContainer";
import { useAppSelector } from "@/store/hooks";

const UserModal = dynamic(
  () => import("@/app/(authed-routes)/_globalComponents/UserModal"),
  {
    loading: () => null,
    ssr: false,
  }
);

function Reply({
  postComment,
  reply,
  ScrollableContainerRef,
}: {
  postComment: PrismaPostCommentType;
  reply: PrismaReplyCommentType;
  ScrollableContainerRef: RefObject<HTMLUListElement | null>;
}) {
  const { user, comment, likes, replyToName, commentId, userId } = reply;

  const { id } = useAppSelector((s) => s.user);
  const { deletedReplies } = useAppSelector((s) => s.following);

  const { postsState } = useInfoContext();

  const { containerRef, isVisible } = useObserveVisibility();
  const [isContainerHovered, setIsContainerHovered] = useState(false);

  const { name, avatar, fullname, _count, posts, followers } = user;
  const recomendation: PrismaRecomendationType = {
    userId,
    name,
    avatar,
    fullname,
    _count,
    posts,
    followers,
  };

  const isSelfPost = postsState[0].userId === id;
  const isSelfReply = userId === id;
  const isDeletedReply = deletedReplies.includes(reply.id);

  if (isDeletedReply) return;

  return (
    <li className="">
      <div ref={containerRef} className="flex items-start gap-x-2">
        <Avatar
          name={user.name}
          avatar={user.avatar}
          setIsContainerHovered={setIsContainerHovered}
          ScrollableContainerRef={ScrollableContainerRef}
        />
        <div className="grow space-y-2 min-w-0">
          <div>
            <div className="float-left mr-1 text-sm">
              <Name
                name={user.name}
                setIsContainerHovered={setIsContainerHovered}
                ScrollableContainerRef={ScrollableContainerRef}
              />
            </div>
            <p className="text-sm break-words w-full max-w-full">
              {replyToName && (
                <span className="text-info mr-1">@{replyToName}</span>
              )}
              {comment}
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <CreatedAt />
            <TotalCommentLikes commentLikes={likes} />
            <ReplyTheComment
              commentId={postComment.id}
              commentOwnerId={reply.userId}
              name={user.name}
              isReplyToReply={true}
              reply={reply}
            />
            {isSelfPost ? (
              <CommentSettingsContainer
                postComment={postComment}
                reply={reply}
              />
            ) : isSelfReply ? (
              <CommentSettingsContainer
                postComment={postComment}
                reply={reply}
              />
            ) : null}
          </div>
        </div>
        <LikeReplyButton
          reply={reply}
          postComment={postComment}
          commentId={commentId}
        />
      </div>
      {isVisible && (
        <UserModal
          userId={reply.userId}
          isContainerHovered={isContainerHovered}
          setIsContainerHovered={setIsContainerHovered}
          recomendation={recomendation}
        />
      )}
    </li>
  );
}
export default Reply;
