import { Media } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

function Posts({
  posts,
}: {
  posts: ({
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    message: string;
  } & {
    medias: Media[];
  })[];
}) {
  return (
    <div className="flex gap-x-[3px] h-[120px]">
      {posts.map((post) => {
        const media = post.medias[0];
        const { type, url, altText } = media;

        return type === "image" ? (
          <Link
            href={`/post/${post.id}`}
            key={post.id}
            className="relative aspect-square overflow-hidden"
          >
            <Image src={url} fill alt={altText || "image"} sizes="120px" />
          </Link>
        ) : (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className="block aspect-square"
          >
            <video
              src={url.replace("http://", "https://")}
              className="w-full h-full object-cover"
              preload="metadata"
            />
          </Link>
        );
      })}
    </div>
  );
}
export default Posts;
