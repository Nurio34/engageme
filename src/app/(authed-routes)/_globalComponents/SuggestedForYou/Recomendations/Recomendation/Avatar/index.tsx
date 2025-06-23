import Image from "next/image";

function Avatar({ avatar, name }: { avatar: string; name: string }) {
  return (
    <figure className="relative w-[74px] aspect-square mt-3 mb-1 rounded-full overflow-hidden">
      <Image
        src={avatar}
        fill
        alt={`avatar of ${name}`}
        className=" object-cover"
        sizes="74px"
      />
    </figure>
  );
}
export default Avatar;
