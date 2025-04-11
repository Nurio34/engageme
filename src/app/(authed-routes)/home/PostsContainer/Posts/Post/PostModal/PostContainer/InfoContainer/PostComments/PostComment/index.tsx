import { useEffect, useState } from "react";
import { PrismaPostComment_WithLikes_withUser } from "../../../../../../../../../../../../prisma/types/post";
import Avatar from "../../../../../Header/Avatar";
import CommentContainer from "./CommentContainer";
import LikeTheCommentButton from "./LikeTheCommentButton";
import { getLikesOfTheComment } from "@/app/api/like/handler/getLikesOfTheComment";
import { useUser } from "@clerk/nextjs";
import { PostCommentLike } from "@prisma/client";

function PostComment({
  postComment,
}: {
  postComment: PrismaPostComment_WithLikes_withUser;
}) {
  const { user, comment, updatedAt, likes, id } = postComment;
  const { avatar, name } = user;

  const { user: clerkUser } = useUser();

  const [commentLikes, setCommentLikes] = useState<PostCommentLike[]>([]);
  const [isCommentLiked, setIsCommentLiked] = useState(false);

  useEffect(() => {
    const getLikesOfTheCommentAction = async () => {
      if (!clerkUser) return;

      try {
        const { status, commentLikes, isCommentLiked } =
          await getLikesOfTheComment(id, clerkUser.id);
        if (status === "fail") return;

        setCommentLikes(commentLikes);
        setIsCommentLiked(isCommentLiked);
      } catch (error) {
        console.log(error);
      }
    };

    getLikesOfTheCommentAction();
  }, []);

  return (
    <li className="py-3">
      <div className="flex items-start gap-x-3">
        <Avatar avatar={avatar} />
        <CommentContainer
          name={name}
          comment={comment}
          updatedAt={updatedAt}
          commentLikes={commentLikes}
        />
        <LikeTheCommentButton
          isCommentLiked={isCommentLiked}
          commentId={id}
          setIsCommentLiked={setIsCommentLiked}
          setCommentLikes={setCommentLikes}
        />
      </div>
    </li>
  );
}
export default PostComment;
