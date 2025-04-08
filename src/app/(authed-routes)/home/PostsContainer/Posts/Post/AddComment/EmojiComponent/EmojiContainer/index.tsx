import { store } from "@/store";
import { Provider } from "react-redux";
import Client from "./client";
import { Dispatch, SetStateAction } from "react";

function EmojiContainer({
  setComment,
}: {
  setComment: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Provider store={store}>
      <Client setComment={setComment} />
    </Provider>
  );
}
export default EmojiContainer;
