import { LuDot } from "react-icons/lu";
import { PrismaPostType } from "../../../../../../../../prisma/types/post";
import Avatar from "./Avatar";
import CreatedAt from "./CreatedAt";
import Name from "./Name";
import SettingsContainer from "./SettingsContainer";
import { Dispatch, SetStateAction } from "react";

function Header({
  post,
  setIsContainerHovered,
}: {
  post: PrismaPostType;
  setIsContainerHovered: Dispatch<SetStateAction<boolean>>;
}) {
  const { updatedAt, user } = post;
  const { avatar, name } = user;

  return (
    <div className="flex justify-start items-center gap-3 px-2 md:px-0">
      <Avatar
        avatar={avatar}
        name={name}
        setIsContainerHovered={setIsContainerHovered}
      />
      <div className="flex items-center ">
        <Name name={name} setIsContainerHovered={setIsContainerHovered} />
        <LuDot />
        <CreatedAt updatedAt={updatedAt} postId={post.id} />
      </div>
      <SettingsContainer post={post} />
    </div>
  );
}
export default Header;
