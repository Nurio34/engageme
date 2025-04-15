import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { ChangeEvent, FormEvent, useEffect } from "react";

function TextArea() {
  const { message, setMessage, maxMessageLength } = useCreateModalContext();

  useEffect(() => {
    if (message.length <= maxMessageLength) return;
    setMessage(message.slice(0, maxMessageLength));
  }, [message]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (message.length === maxMessageLength) return;

    const value = e.currentTarget.value;
    setMessage(value);
  };

  const handleOnInput = (e: FormEvent<HTMLTextAreaElement>) => {
    if (message.length !== maxMessageLength) return;

    const nativeEvent = e.nativeEvent as InputEvent;
    const inputType = nativeEvent.inputType;
    if (inputType === "deleteContentBackward")
      setMessage(message.slice(0, maxMessageLength - 1));
  };

  return (
    <div>
      <textarea
        name="message"
        id="message"
        className="resize-none w-full min-h-44 outline-none bg-transparent "
        placeholder="Type your message ..."
        value={message}
        onChange={handleChange}
        onInput={handleOnInput}
      ></textarea>
      {/* <div>{count}</div> */}
    </div>
  );
}
export default TextArea;
