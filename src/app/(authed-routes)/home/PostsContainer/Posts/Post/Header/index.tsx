import { LuDot } from "react-icons/lu";
import { PrismaPostType } from "../../../../../../../../prisma/types/post";
import Avatar from "./Avatar";
import CreatedAt from "./CreatedAt";
import Name from "./Name";
import ActionsContainer from "./ActionsContainer";
import { currentUser } from "@clerk/nextjs/server";

async function Header({ post }: { post: PrismaPostType }) {
  const user = await currentUser();
  if (!user) return;

  const { username, imageUrl } = user;
  const { updatedAt } = post;

  return (
    <div className="flex justify-start items-center gap-3 px-2 md:px-0">
      <Avatar avatar={imageUrl} />
      <div className="flex items-center ">
        <Name name={username!} />
        <LuDot />
        <CreatedAt updatedAt={updatedAt} />
      </div>
      <ActionsContainer />
    </div>
  );
}
export default Header;
