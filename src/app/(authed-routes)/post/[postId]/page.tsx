import { getPost } from "./actions/getPost";
import PostError from "./_components/PostError";
import ProviderComponent from "./Provider";

type PostPageProps = {
  params: Promise<{ postId: string }>;
};

async function PostWrapper(props: PostPageProps) {
  // ✅ Directly destructure `params` without await
  const { postId } = await props.params;

  const { status, post } = await getPost(postId);

  if (status === "fail" || post === null) return <PostError postId={postId} />;

  return <ProviderComponent post={post} />;
}

export default PostWrapper;
