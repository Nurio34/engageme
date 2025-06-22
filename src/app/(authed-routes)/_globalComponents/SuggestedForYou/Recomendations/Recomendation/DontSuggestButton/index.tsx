import { HiMiniXMark } from "react-icons/hi2";
import { dontSuggest } from "../../../_actions/dontSuggest";
import toast from "react-hot-toast";

function DontSuggestButton({ userId }: { userId: string }) {
  const dontSuggestAction = async () => {
    try {
      const { status, msg } = await dontSuggest(userId);
      if (status === "fail") return toast.error(msg);
      return toast.success(msg);
    } catch (error) {
      console.log(error);
      toast.error("Unexpected server error! Please try again...");
    }
  };

  return (
    <button
      type="button"
      className="absolute top-2 right-2 text-base-content/50 text-xl"
      onClick={dontSuggestAction}
    >
      <HiMiniXMark />
    </button>
  );
}
export default DontSuggestButton;
