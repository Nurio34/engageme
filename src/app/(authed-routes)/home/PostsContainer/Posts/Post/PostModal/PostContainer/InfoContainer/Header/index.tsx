import { useUser } from "@clerk/nextjs";
import Avatar from "../../../../Header/Avatar";
import Name from "../../../../Header/Name";
import ActionsContainer from "../../../../Header/ActionsContainer";
import { PrismaPostType } from "../../../../../../../../../../../prisma/types/post";

function Header({ post }: { post: PrismaPostType }) {
  const { user } = post;
  const { name, avatar } = user;

  return (
    <div className="flex justify-start items-center gap-3 px-4 py-3 border-b">
      <Avatar avatar={avatar} />
      <Name name={name} />
      <ActionsContainer />
    </div>
  );
}
export default Header;
