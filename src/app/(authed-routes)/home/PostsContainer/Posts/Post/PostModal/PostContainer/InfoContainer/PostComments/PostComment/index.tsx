import { PrismaPostCommentType } from "../../../../../../../../../../../../prisma/types/post";
import Avatar from "../../../../../Header/Avatar";
import CommentContainer from "./CommentContainer";
import LikeTheCommentButton from "./LikeTheCommentButton";

function PostComment({ postComment }: { postComment: PrismaPostCommentType }) {
  const { user, comment, updatedAt, likes } = postComment;
  const { avatar, name } = user;

  return (
    <li className="py-3">
      <div className="grid grid-cols-[auto,1fr,auto] items-start gap-x-1 lg:gap-x-3 pr-2 lg:pr-0">
        <Avatar avatar={avatar} />
        <CommentContainer
          name={name}
          comment={comment}
          updatedAt={updatedAt}
          commentLikes={likes}
        />
        <LikeTheCommentButton postComment={postComment} />
      </div>
    </li>
  );
}
export default PostComment;
