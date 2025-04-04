import { Media } from "@prisma/client";

function VideoMedia({ media }: { media: Media }) {
  console.log(media);

  return <div>VideoMedia</div>;
}
export default VideoMedia;
