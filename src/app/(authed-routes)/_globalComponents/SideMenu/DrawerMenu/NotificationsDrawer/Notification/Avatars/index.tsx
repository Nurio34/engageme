import Image from "next/image";
import { User } from "../..";

function Avatars({ users }: { users: User[] }) {
  const lastUser = users[0].avatar;
  const lastSecond = users[1]?.avatar;

  return lastSecond ? (
    <div className="relative h-11">
      <figure className="absolute bottom-0 left-4 z-10 outline-2 outline outline-base-100 w-8 aspect-square rounded-full overflow-hidden">
        <Image src={lastUser} fill alt="avatar" />
      </figure>
      <figure className="absolute w-8 aspect-square rounded-full overflow-hidden">
        <Image src={lastSecond} fill alt="avatar" />
      </figure>
    </div>
  ) : (
    <div className="relative h-11">
      <figure className="absolute w-11 aspect-square rounded-full overflow-hidden">
        <Image src={lastUser} fill alt="avatar" />
      </figure>
    </div>
  );
}
export default Avatars;
