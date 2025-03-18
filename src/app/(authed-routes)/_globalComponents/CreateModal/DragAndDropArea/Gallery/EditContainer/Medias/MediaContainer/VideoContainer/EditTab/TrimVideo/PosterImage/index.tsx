import Image from "next/image";

function PosterImage({ poster }: { poster: string }) {
  return (
    <figure className="relative grow h-full">
      <Image src={poster} fill alt="poster" />
    </figure>
  );
}
export default PosterImage;
