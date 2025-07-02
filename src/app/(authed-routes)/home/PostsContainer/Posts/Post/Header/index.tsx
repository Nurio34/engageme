import { LuDot } from "react-icons/lu";
import { PrismaPostType } from "../../../../../../../../prisma/types/post";
import Avatar from "./Avatar";
import CreatedAt from "./CreatedAt";
import Name from "./Name";
import SettingsContainer from "./SettingsContainer";

function Header({ post }: { post: PrismaPostType }) {
  const { updatedAt, user } = post;
  const { avatar, name } = user;

  return (
    <div className="flex justify-start items-center gap-3 px-2 md:px-0">
      <Avatar avatar={avatar} />
      <div className="flex items-center ">
        <Name name={name} userId={post.userId} />
        <LuDot />
        <CreatedAt updatedAt={updatedAt} postId={post.id} />
      </div>
      <SettingsContainer post={post} />
    </div>
  );
}
export default Header;
