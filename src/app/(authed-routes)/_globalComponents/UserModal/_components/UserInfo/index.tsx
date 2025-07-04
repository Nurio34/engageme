import Image from "next/image";

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
    <div className="px-4">
      <figure className="relative w-16 aspect-square rounded-full overflow-hidden">
        <Image
          src={avatar || "/placeholders/avatar.webp"}
          alt={`avatar of ${name}`}
          fill
          sizes="64px"
        />
      </figure>
      <div>
        <p>{name}</p>
        <p>{fullname}</p>
      </div>
    </div>
  );
}
export default UserInfo;
