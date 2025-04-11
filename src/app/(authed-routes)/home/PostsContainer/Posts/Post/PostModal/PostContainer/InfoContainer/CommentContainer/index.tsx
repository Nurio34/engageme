import EmojiContainer from "./EmojiContainer";
import PostButton from "./PostButton";
import TextArea from "./TextArea";

function CommentContainer() {
  return (
    <form
      action=""
      className="border-t-2 p-4 py-3
        flex items-center gap-x-3
    "
    >
      <EmojiContainer />
      <TextArea />
      <PostButton />
    </form>
  );
}
export default CommentContainer;
