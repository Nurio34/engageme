import Name from "../../../../Header/Name";
import ActionsContainer from "../../../../Header/ActionsContainer";
import { PrismaPostType } from "../../../../../../../../../../../prisma/types/post";
import Avatar from "../../../../Header/Avatar";
import DragButton from "./DragButton";

function Header({ post }: { post: PrismaPostType }) {
  const { user } = post;
  const { name, avatar } = user;

  return (
    <div className="grid grid-cols-3 items-center gap-x-3 pl-1 pr-2 lg:px-4  py-1 lg:py-3 border-b">
      <div className="flex items-center gap-x-3 mr-auto">
        <Avatar avatar={avatar} />
        <Name name={name} />
      </div>
      <DragButton />
      <ActionsContainer />
    </div>
  );
}
export default Header;
