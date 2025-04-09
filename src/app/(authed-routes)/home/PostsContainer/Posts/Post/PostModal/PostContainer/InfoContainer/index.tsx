import { useUser } from "@clerk/nextjs";
import { PrismaPostType } from "../../../../../../../../../../prisma/types/post";
import Description from "../../../Description";
import Avatar from "../../../Header/Avatar";
import Header from "./Header";
import CreatedAt from "../../../Header/CreatedAt";
import Comments from "./Comments";
import ActionButtons from "./ActionButtons";

function InfoContainer({ post }: { post: PrismaPostType }) {
  const { user } = useUser();
  if (!user) return;

  const { imageUrl } = user;
  const { updatedAt } = post;

  return (
    <div className="w-[500px]">
      <Header />
      <div className="w-full px-4 py-3">
        <div className="flex items-start gap-4">
          <Avatar avatar={imageUrl} />
          <div>
            <Description post={post} />
            <CreatedAt updatedAt={updatedAt} />
          </div>
        </div>
        <Comments />
        <ActionButtons post={post} />
      </div>
    </div>
  );
}
export default InfoContainer;
