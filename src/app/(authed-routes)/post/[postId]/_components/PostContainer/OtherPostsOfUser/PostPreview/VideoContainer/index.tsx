import { useState } from "react";
import { PostPreviewType } from "../../../../../../../../../../prisma/types/postPreview";
import { HiMiniSquare2Stack } from "react-icons/hi2";
import { BiSolidMoviePlay } from "react-icons/bi";
import CountsViewLink from "../CountsViewLink";

function VideoContainer({ post }: { post: PostPreviewType }) {
  const { medias, id: postId, _count } = post;
  const { url, poster } = medias[0];
  const {
    medias: mediasCount,
    likes: likesCount,
    comments: commentsCount,
  } = _count;

  const [isHover, setIsHover] = useState(false);

  return (
    <li
      className="relative aspect-[0.75] cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <video
        src={url.replace("http://", "https://")}
        className="object-cover w-full h-full"
        poster={poster?.url || undefined}
        preload="metadata"
        controls={false}
      />
      <div className="absolute top-1 right-1">
        {mediasCount > 1 ? (
          <HiMiniSquare2Stack
            className="text-2xl text-base-100"
            style={{ transform: "rotateY(180deg) rotateX(180deg)" }}
          />
        ) : (
          <BiSolidMoviePlay className="text-2xl text-base-100" />
        )}
      </div>
      <CountsViewLink
        isHover={isHover}
        postId={postId}
        likesCount={likesCount}
        commentsCount={commentsCount}
      />
    </li>
  );
}
export default VideoContainer;
