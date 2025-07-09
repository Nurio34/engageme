import toast from "react-hot-toast";

function CopyLinkButton({ postId }: { postId: string }) {
  const link = `${process.env.NEXT_PUBLIC_SITE_URL}/post/${postId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard.");
  };

  return (
    <li className="py-1 h-12 border-b">
      <button
        type="button"
        className="w-full h-full flex justify-center items-center"
        onClick={copyLink}
      >
        Copy link
      </button>
    </li>
  );
}
export default CopyLinkButton;
