import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";

function MessageCharacterIndicator() {
  const { message, maxMessageLength } = useCreateModalContext();
  const totalCharacters = message.length;

  return (
    <div className=" text-base-content/40 text-xs">
      {totalCharacters}/{maxMessageLength}
    </div>
  );
}
export default MessageCharacterIndicator;
