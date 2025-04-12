import { useUser } from "@clerk/nextjs";
import Comment from "./Comment";
import { PostComment } from "@prisma/client";
import { PrismaPostType } from "../../../../../../../../../prisma/types/post";

function SentComments({
  sentComments,
  post,
}: {
  sentComments: PostComment[];
  post: PrismaPostType;
}) {
  const { user } = useUser();
  const username = user?.username;

  return (
    <div className="mt-2 text-sm space-y-1">
      {sentComments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            username={username}
            post={post}
          />
        );
      })}
    </div>
  );
}
export default SentComments;
