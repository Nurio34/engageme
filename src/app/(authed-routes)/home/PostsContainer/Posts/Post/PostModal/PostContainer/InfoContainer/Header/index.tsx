import { useUser } from "@clerk/nextjs";
import Avatar from "../../../../Header/Avatar";
import Name from "../../../../Header/Name";
import ActionsContainer from "../../../../Header/ActionsContainer";

function Header() {
  const { user } = useUser();
  if (!user) return;

  const { username, imageUrl } = user;

  return (
    <div className="flex justify-start items-center gap-3 px-4 py-3 border-b">
      <Avatar avatar={imageUrl} />
      <Name name={username!} />
      <ActionsContainer />
    </div>
  );
}
export default Header;
