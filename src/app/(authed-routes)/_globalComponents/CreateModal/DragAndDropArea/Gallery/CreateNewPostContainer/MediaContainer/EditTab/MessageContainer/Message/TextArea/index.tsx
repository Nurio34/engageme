import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { ChangeEvent, KeyboardEvent, useEffect } from "react";

function TextArea() {
  const { message, setMessage, maxMessageLength } = useCreateModalContext();
  console.log(message);

  useEffect(() => {
    if (message.length <= maxMessageLength) return;
    setMessage(message.slice(0, maxMessageLength));
  }, [message]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (message.length === maxMessageLength) return;

    const value = e.currentTarget.value;
    setMessage(value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (message.length !== maxMessageLength) return;

    const key = e.code;
    if (key === "Backspace") setMessage(message.slice(0, maxMessageLength - 1));
    console.log(key);
  };

  return (
    <textarea
      name="message"
      id="message"
      className="resize-none w-full min-h-44 outline-none"
      placeholder="Type your message ..."
      value={message}
      onChange={handleChange}
      onKeyUp={handleKeyPress}
    ></textarea>
  );
}
export default TextArea;
