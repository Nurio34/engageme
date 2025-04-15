import { PrismaPostCommentType } from "../../../../../../../../../../../../prisma/types/post";
import Avatar from "../../../../../Header/Avatar";
import CommentContainer from "./CommentContainer";
import RepliesContainer from "./CommentContainer/RepliesContainer";
import LikeTheCommentButton from "./LikeTheCommentButton";

function PostComment({ postComment }: { postComment: PrismaPostCommentType }) {
  return (
    <li className="py-3">
      <div className="grid grid-cols-[auto,1fr,auto] items-start gap-x-1 lg:gap-x-3 pr-2 lg:pr-0">
        <Avatar avatar={postComment.user.avatar} />
        <CommentContainer postComment={postComment} />
        <LikeTheCommentButton postComment={postComment} />
        <RepliesContainer postComment={postComment} />
      </div>
    </li>
  );
}
export default PostComment;
