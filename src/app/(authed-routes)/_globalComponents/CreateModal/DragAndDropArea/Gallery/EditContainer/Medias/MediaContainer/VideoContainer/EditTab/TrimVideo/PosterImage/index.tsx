import Image from "next/image";

function PosterImage({ poster }: { poster: string }) {
  return (
    <figure className="relative grow h-full">
      <Image
        src={poster}
        fill
        alt="poster"
        sizes="(max-width: 768px) 50vw, 10vw"
      />
    </figure>
  );
}
export default PosterImage;
