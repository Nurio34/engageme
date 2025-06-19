import { PostPreviewType } from "../../../../../../../../../prisma/types/postPreview";
import ImageContainer from "./ImageContainer";
import VideoContainer from "./VideoContainer";

function PostPreview({ post }: { post: PostPreviewType }) {
  const { type } = post.medias[0];

  return type === "image" ? (
    <ImageContainer post={post} />
  ) : (
    <VideoContainer post={post} />
  );
}
export default PostPreview;
