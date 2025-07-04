import ViewButton from "./ViewButton";
import TotalReplies from "./TotalReplies";
import {
  PrismaPostCommentType,
  PrismaReplyCommentType,
} from "../../../../../../../../../../../../../../prisma/types/post";
import Reply from "./Reply";
import { RefObject, useEffect, useState } from "react";
import { useAnimatedMount } from "@/hooks/useAnimatedMount";
import ShowMoreRepliesButton from "./ShowMoreRepliesButton";
import { useInfoContext } from "../../../../Context";

function RepliesContainer({
  postComment,
  ScrollableContainerRef,
}: {
  postComment: PrismaPostCommentType;
  ScrollableContainerRef: RefObject<HTMLUListElement | null>;
}) {
  const { replies } = postComment;
  const isAnyReply = replies.length > 0;

  const { repliedCommentId } = useInfoContext();

  const [isRepliesVisible, setIsRepliesVisible] = useState(false);
  const { isMounted, style } = useAnimatedMount(isRepliesVisible, "scaleY");
  console.log(`ı dont know what to do with this style:${style}`);

  const [shownReplies, setShownReplies] = useState<PrismaReplyCommentType[]>(
    []
  );
  const [shownRepliesAmount, setShownRepliesAmount] = useState(5);

  useEffect(() => {
    setShownReplies(replies.slice(0, shownRepliesAmount));
  }, [shownRepliesAmount, replies]);

  useEffect(() => {
    if (repliedCommentId === postComment.id) setIsRepliesVisible(true);
  }, [repliedCommentId]);

  return (
    isAnyReply && (
      <div className="row-start-2 row-end-3 col-start-2 col-end-4">
        <div className="pt-4 flex items-center gap-x-1">
          <ViewButton
            isRepliesVisible={isRepliesVisible}
            setIsRepliesVisible={setIsRepliesVisible}
            setShownRepliesAmount={setShownRepliesAmount}
          />
          <TotalReplies totalReplies={replies.length} />
        </div>
        {isMounted && (
          <>
            <ul
              className="my-4 space-y-4 transition-all"
              // style={{ ...style, zIndex: 100 }}
            >
              {shownReplies.map((reply) => (
                <Reply
                  key={reply.id}
                  postComment={postComment}
                  reply={reply}
                  ScrollableContainerRef={ScrollableContainerRef}
                />
              ))}
            </ul>
            <ShowMoreRepliesButton
              setShownRepliesAmount={setShownRepliesAmount}
              totalRepliesAmount={replies.length}
              shownRepliesAmount={shownReplies.length}
            />
          </>
        )}
      </div>
    )
  );
}
export default RepliesContainer;
