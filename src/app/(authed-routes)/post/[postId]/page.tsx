import { getPost } from "./actions/getPost";
import PostError from "./_components/PostError";
import { Metadata } from "next";
import PostContainer from "./_components/PostContainer";
import NoOtherPosts from "./_components/NoOtherPosts";
import Footer from "../../_globalComponents/Footer";

type PostPageProps = {
  params: Promise<{ postId: string }>;
};

export async function generateMetadata(
  props: PostPageProps
): Promise<Metadata> {
  const { postId } = await props.params;
  const { status, post } = await getPost(postId);

  const defaultTitle = "Post in 'Engage Me'";
  const description =
    "Engage Me is a modern social media app to share photos, videos, and stories with your friends. Like, comment, follow, and explore trending content—just like Instagram, but better.";

  if (status === "fail" || !post) {
    return {
      title: "Gönderi Bulunamadı | Engage Me",
      description: `${postId} ID'li gönderi bulunamadı.`,
    };
  }

  const { altText, url, width, height, type, poster } = post.medias[0];
  const title = post.message || defaultTitle;
  const imageAlt = altText || post.message || "Engage Me post media";
  const isVideo = type === "video";

  return {
    title,
    description,
    icons: "/favicon.ico",
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${postId}`,
      siteName: "Engage Me",
      type: "article",
      ...(isVideo
        ? {
            videos: [
              {
                url,
                width: width || 1280,
                height: height || 720,
              },
            ],
          }
        : {
            images: [
              {
                url,
                width: width || 1200,
                height: height || 630,
                alt: imageAlt,
              },
            ],
          }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: !isVideo
        ? {
            url,
            alt: imageAlt,
          }
        : poster?.url
        ? {
            url: poster.url,
            alt: post.message || "Engage Me post media",
          }
        : {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/placeholders/twitter_meta.png`,
            alt: "Default placeholder image for Engage Me",
          },
    },
  };
}

async function PostWrapper(props: PostPageProps) {
  // ✅ Directly destructure `params` without await
  const { postId } = await props.params;

  const { status, post } = await getPost(postId);

  if (status === "fail" || post === null) return <PostError postId={postId} />;

  const { posts: postsCount } = post?.user._count;
  return (
    <main>
      <PostContainer post={post} />
      {postsCount === 1 && <NoOtherPosts />}
      <Footer />
    </main>
  );
}

export default PostWrapper;
