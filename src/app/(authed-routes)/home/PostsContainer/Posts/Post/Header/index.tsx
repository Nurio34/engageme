import { LuDot } from "react-icons/lu";
import { PrismaPostType } from "../../../../../../../../prisma/types/post";
import Avatar from "./Avatar";
import CreatedAt from "./CreatedAt";
import Name from "./Name";
import ActionsContainer from "./ActionsContainer";

function Header({ post }: { post: PrismaPostType }) {
  const { user } = post;
  const { avatar, name, updatedAt } = user;

  return (
    <div className="flex justify-start items-center gap-3 px-2 md:px-0">
      <Avatar avatar={avatar} />
      <div className="flex items-center ">
        <Name name={name} />
        <LuDot />
        <CreatedAt updatedAt={updatedAt} />
      </div>
      <ActionsContainer />
    </div>
  );
}
export default Header;
