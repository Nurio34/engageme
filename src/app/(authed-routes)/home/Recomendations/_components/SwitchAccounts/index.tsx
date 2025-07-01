import { useAppSelector } from "@/store/hooks";
import Image from "next/image";

function SwitchAccounts() {
  const { avatar, fullname, username } = useAppSelector((s) => s.user);

  return (
    <div className="flex gap-x-3 items-center justify-center px-4">
      <figure className="relative w-11 aspect-square rounded-full overflow-hidden">
        <Image src={avatar} fill alt={`avatar of ${username}`} sizes="44px" />
      </figure>
      <div className="grow">
        <p className="text-sm font-semibold leading-[18px]">{username}</p>
        <p className="text-sm font-normal leading-[18px] text-base-content/70">
          {fullname}
        </p>
      </div>
      <button
        type="button"
        className="text-xs text-primary underline-offset-2 font-medium hover:underline"
      >
        Switch
      </button>
    </div>
  );
}
export default SwitchAccounts;
