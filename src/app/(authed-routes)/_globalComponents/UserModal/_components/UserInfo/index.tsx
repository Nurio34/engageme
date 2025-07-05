import Image from "next/image";
import Link from "next/link";

function UserInfo({
  avatar,
  name,
  fullname,
}: {
  avatar: string | null;
  name: string;
  fullname: string | null;
}) {
  return (
    <div className="px-4 flex items-center gap-x-4">
      <Link
        href={`/${name}`}
        className="relative w-14 aspect-square rounded-full overflow-hidden"
      >
        <Image
          src={avatar || "/placeholders/avatar.webp"}
          alt={`avatar of ${name}`}
          fill
          sizes="56px"
        />
      </Link>
      <div className="space-y-1">
        <Link href={`/${name}`} className="font-bold leading-4">
          {name}
        </Link>
        <p className="text-sm text-base-content/70 leading-4">{fullname}</p>
      </div>
    </div>
  );
}
export default UserInfo;
