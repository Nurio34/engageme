import Avatar from "@/app/(authed-routes)/home/PostsContainer/Posts/Post/Header/Avatar";
import { PrismaReplyCommentType } from "../../../../../../../../../../../../../../../prisma/types/post";
import Name from "@/app/(authed-routes)/home/PostsContainer/Posts/Post/Header/Name";
import CreatedAt from "@/app/(authed-routes)/home/PostsContainer/Posts/Post/Header/CreatedAt";
import TotalCommentLikes from "../../TotalCommentLikes";
import ReplyTheComment from "../../ReplyTheComment";
import LikeTheReplyButton from "./LikeTheReplyButton";

function Reply({ reply }: { reply: PrismaReplyCommentType }) {
  const { user, comment, createdAt, likes } = reply;

  return (
    <li className="flex items-start gap-x-2">
      <Avatar avatar={user.avatar} />
      <div className="grow space-y-2">
        <div>
          <div className="float-left mr-1 text-sm">
            <Name name={user.name} />
          </div>
          <p className="text-sm">{comment}</p>
        </div>
        <div className="flex items-center gap-x-4">
          <CreatedAt updatedAt={createdAt} />
          <TotalCommentLikes commentLikes={likes} />
          <ReplyTheComment
            id={reply.id}
            name={user.name}
            isReplyToReply={true}
          />
        </div>
      </div>
      <LikeTheReplyButton />
    </li>
  );
}
export default Reply;
