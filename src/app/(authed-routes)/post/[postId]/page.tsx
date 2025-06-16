import { getPost } from "./actions/getPost";
import PostError from "./_components/PostError";
import ProviderComponent from "./Provider";

type PostPageProps = {
  params: { postId: string };
};

async function PostWrapper(props: PostPageProps) {
  const params = await props.params;
  const { postId } = params;

  const { status, post } = await getPost(postId);

  if (status === "fail" || post === null) return <PostError postId={postId} />;

  return <ProviderComponent post={post} />;
}

export default PostWrapper;
