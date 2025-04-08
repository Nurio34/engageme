import { useUser } from "@clerk/nextjs";
import { SentCommentType } from "../client";
import Comment from "./Comment";

function SentComments({ sentComments }: { sentComments: SentCommentType[] }) {
  const { user } = useUser();
  const username = user?.username;

  return (
    <div className="mt-2 text-sm">
      {sentComments.map((comment, index) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            index={index}
            username={username}
          />
        );
      })}
    </div>
  );
}
export default SentComments;
