import { useEffect, useRef, useState } from "react";
import { PrismaPostComment_WithLikes_withUser } from "../../../../../../../../../../../prisma/types/post";
import PostComment from "./PostComment";

function PostComments({
  postComments,
  isTruncated,
}: {
  postComments: PrismaPostComment_WithLikes_withUser[];
  isTruncated: boolean;
}) {
  const CommentsContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    if (CommentsContainerRef.current)
      setContainerHeight(
        CommentsContainerRef.current.getBoundingClientRect().height
      );
  }, [isTruncated, reRender]);

  useEffect(() => {
    if (!isTruncated) setReRender(true);
  }, [isTruncated]);

  useEffect(() => {
    if (reRender) setReRender(false);
  }, [reRender]);

  return (
    <div ref={CommentsContainerRef} className="grow">
      {!reRender && (
        <ul
          className="overflow-x-hidden overflow-y-auto"
          style={{ height: containerHeight, maxHeight: containerHeight }}
        >
          {postComments.map((postComment) => (
            <PostComment key={postComment.id} postComment={postComment} />
          ))}
        </ul>
      )}
    </div>
  );
}
export default PostComments;
