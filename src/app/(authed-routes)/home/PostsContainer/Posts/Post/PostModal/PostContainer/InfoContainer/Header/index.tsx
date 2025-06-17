import Name from "../../../../Header/Name";
import ActionsContainer from "../../../../Header/SettingsContainer";
import { PrismaPostType } from "../../../../../../../../../../../prisma/types/post";
import DragButton from "./DragButton";
import Avatar from "../_components/Avatar";

function Header({ post }: { post: PrismaPostType }) {
  const { user } = post;
  const { name } = user;

  return (
    <div className="grid grid-cols-3 items-center gap-x-3 pl-1 pr-2 lg:px-4  py-1 lg:py-3 border-b">
      <div className="flex items-center gap-x-3 mr-auto">
        <Avatar />
        <Name name={name} />
      </div>
      <DragButton />
      <ActionsContainer post={post} />
    </div>
  );
}
export default Header;
