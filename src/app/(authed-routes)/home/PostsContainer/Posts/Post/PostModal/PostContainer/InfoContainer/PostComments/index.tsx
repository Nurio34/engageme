import { useEffect, useRef, useState } from "react";
import { PrismaPostCommentType } from "../../../../../../../../../../../prisma/types/post";
import PostComment from "./PostComment";
import { SortByType } from "..";
import { useAppSelector } from "@/store/hooks";
import NoCommentsPlaceholder from "./NoCommentsPlaceholder";

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
  const { id } = useAppSelector((s) => s.user);
  const { device } = useAppSelector((s) => s.modals);
  const { type, height } = device;
  const isDesktop = type === "desktop";

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
  }, [isTruncated, reRender, textAreaHeight, device]);

  useEffect(() => {
    if (!isTruncated) setReRender(true);
  }, [isTruncated]);

  useEffect(() => {
    if (isDesktop) setReRender(true);
  }, [textAreaHeight, isDesktop]);

  useEffect(() => {
    if (reRender) setReRender(false);
  }, [reRender]);

  useEffect(() => {
    if (sortBy === "For You")
      setSortedComments([
        ...comments.filter((commentObj) => commentObj.userId === id),
        ...comments.filter((commentObj) => commentObj.userId !== id),
      ]);
    else if (sortBy === "Most Recent") setSortedComments(comments);
  }, [id, sortBy, comments]);

  return (
    <div ref={CommentsContainerRef} className="grow relative">
      {!reRender && (
        <ul
          className="overflow-x-hidden overflow-y-auto"
          style={{
            height: isDesktop ? containerHeight : height - 305,
            maxHeight: isDesktop ? containerHeight : height - 305,
          }}
        >
          {sortedComments.map((postComment) => (
            <PostComment key={postComment.id} postComment={postComment} />
          ))}
        </ul>
      )}
      <NoCommentsPlaceholder commentsAmount={sortedComments.length} />
    </div>
  );
}
export default PostComments;
