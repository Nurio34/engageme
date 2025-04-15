import Loading from "@/app/_globalComponents/LoadingComponents/Loading";
import ViewButton from "./ViewButton";
import TotalReplies from "./TotalReplies";
import { PrismaPostCommentType } from "../../../../../../../../../../../../../../prisma/types/post";
import Avatar from "@/app/(authed-routes)/home/PostsContainer/Posts/Post/Header/Avatar";
import Reply from "./Reply";
import { useState } from "react";
import { useAnimatedMount } from "@/hooks/useAnimatedMount";

function RepliesContainer({
  postComment,
}: {
  postComment: PrismaPostCommentType;
}) {
  const { replies } = postComment;
  const isAnyReply = replies.length > 0;

  const [isRepliesVisible, setIsRepliesVisible] = useState(false);
  const { isMounted, style } = useAnimatedMount(isRepliesVisible);

  return (
    isAnyReply && (
      <div className="row-start-2 row-end-3 col-start-2 col-end-4">
        <div className="pt-4 flex items-center gap-x-1">
          <ViewButton
            isRepliesVisible={isRepliesVisible}
            setIsRepliesVisible={setIsRepliesVisible}
          />
          <TotalReplies totalReplies={replies.length} />
          {/* <div className="ml-2">
          <Loading size={5} />
          </div> */}
        </div>
        {isMounted && (
          <ul className="my-4 space-y-4 transition-all" style={{ ...style }}>
            {replies.map((reply) => (
              <Reply key={reply.id} reply={reply} />
            ))}
          </ul>
        )}
      </div>
    )
  );
}
export default RepliesContainer;
