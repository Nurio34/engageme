import { useEffect, useRef, useState } from "react";
import { PrismaPostCommentType } from "../../../../../../../../../../../prisma/types/post";
import PostComment from "./PostComment";
import { useUser } from "@clerk/nextjs";
import { SortByType } from "..";

function PostComments({
  comments,
  isTruncated,
  textAreaHeight,
  sortBy,
}: {
  comments: PrismaPostCommentType[];
  isTruncated: boolean;
  textAreaHeight: number;
  sortBy: SortByType;
}) {
  const { user } = useUser();
  const userId = user?.id;

  const [sortedComments, setSortedComments] = useState<PrismaPostCommentType[]>(
    []
  );

  const CommentsContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    if (CommentsContainerRef.current)
      setContainerHeight(
        CommentsContainerRef.current.getBoundingClientRect().height
      );
  }, [isTruncated, reRender, textAreaHeight]);

  useEffect(() => {
    if (!isTruncated) setReRender(true);
  }, [isTruncated]);

  useEffect(() => {
    setReRender(true);
  }, [textAreaHeight]);

  useEffect(() => {
    if (reRender) setReRender(false);
  }, [reRender]);

  useEffect(() => {
    if (sortBy === "For You")
      setSortedComments([
        ...comments.filter((commentObj) => commentObj.userId === userId),
        ...comments.filter((commentObj) => commentObj.userId !== userId),
      ]);
    else if (sortBy === "Most Recent") setSortedComments(comments);
  }, [sortBy, comments]);

  return (
    <div ref={CommentsContainerRef} className="grow">
      {!reRender && (
        <ul
          className="overflow-x-hidden overflow-y-auto"
          style={{ height: containerHeight, maxHeight: containerHeight }}
        >
          {sortedComments.map((postComment) => (
            <PostComment key={postComment.id} postComment={postComment} />
          ))}
        </ul>
      )}
    </div>
  );
}
export default PostComments;
