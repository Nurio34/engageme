import { PrismaPostType } from "../../../../../../../../../../../prisma/types/post";
import DragButton from "./DragButton";
import Avatar from "../_components/Avatar";
import { useInfoContext } from "../Context";
import SettingsContainer from "../../../../Header/SettingsContainer";
import Name from "../_components/Name";
import { Dispatch, SetStateAction } from "react";

function Header({
  post,
  setIsContainerHovered,
}: {
  post: PrismaPostType;
  setIsContainerHovered: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = post;
  const { name } = user;

  const { page } = useInfoContext();

  return (
    <div className="grid grid-cols-3 items-center gap-x-3 pl-1 pr-2 lg:px-4  py-1 lg:py-3 border-b">
      <div className="flex items-center gap-x-3 mr-auto">
        <Avatar
          name={name}
          avatar={user.avatar}
          setIsContainerHovered={setIsContainerHovered}
        />
        <Name name={name} setIsContainerHovered={setIsContainerHovered} />
      </div>
      {page === "home" && <DragButton />}
      <SettingsContainer post={post} />
    </div>
  );
}
export default Header;
