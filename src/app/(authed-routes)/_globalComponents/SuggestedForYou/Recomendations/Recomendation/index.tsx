import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";
import Avatar from "./Avatar";
import Name from "./Name";
import FollowButton from "./FollowButton";
import DontSuggestButton from "./DontSuggestButton";
import Fullname from "./Fullname";

function Recomendation({
  recomendation,
}: {
  recomendation: PrismaRecomendationType;
}) {
  const { avatar, name, userId, fullname } = recomendation;

  return (
    <li className="border rounded-md relative" style={{ width: 168 }}>
      <div
        className="px-3 pt-3 pb-2 flex flex-col items-center gap-y-1"
        style={{ height: 178 }}
      >
        <Avatar avatar={avatar} name={name} />
        <Name name={name} />
        <Fullname fullname={fullname} name={name} />
      </div>
      <FollowButton userId={userId} />
      <DontSuggestButton userId={userId} />
    </li>
  );
}
export default Recomendation;
