import Image from "next/image";

export default function Logo() {
  return (
    <div
      className="text-2xl font-bold flex items-center gap-2"
      style={{ fontVariant: "small-caps" }}
    >
      <figure className=" relative w-16 aspect-square">
        <Image src="/app/logo.webp" alt="Logo" fill />
      </figure>
    </div>
  );
}
