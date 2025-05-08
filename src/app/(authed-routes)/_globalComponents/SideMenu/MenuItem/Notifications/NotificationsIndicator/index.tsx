import { useAnimatedMount } from "@/hooks/useAnimatedMount";
import { useAppDispatch } from "@/store/hooks";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { FaComment, FaHeart } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { NotificationIndicator } from "../_hooks/useNotificationIndicator";

function NotificationsIndicator({
  notificationIndicator,
  isRender,
}: {
  notificationIndicator: NotificationIndicator;
  isRender: boolean;
}) {
  const { follow, comment, like } = notificationIndicator;

  const dispatch = useAppDispatch();

  const { isMounted, style } = useAnimatedMount(isRender, "scale");

  return (
    isMounted && (
      <button
        className="absolute left-40 flex items-start gap-x-2 bg-[rgb(255,48,64)] py-1 px-2 rounded-[50vw] shadow-inner transition-all"
        style={{
          ...style,
          boxShadow: "inset 0 0 4px 2px rgb(236,34,84)",
        }}
        onClick={() => dispatch(setCurrentMenu("notifications"))}
      >
        {follow !== 0 && (
          <div className="flex items-center gap-x-1 text-white text-md font-semibold">
            <IoPersonSharp />
            <span>{follow}</span>
          </div>
        )}
        {comment !== 0 && (
          <div className="flex items-center gap-x-1 text-white text-md font-semibold">
            <FaComment /> <span>{comment}</span>
          </div>
        )}
        {like !== 0 && (
          <div className="flex items-center gap-x-1 text-white text-md font-semibold">
            <FaHeart /> <span>{like}</span>
          </div>
        )}
        <div
          className="absolute bottom-0 left-0
            border-8 border-b-transparent border-l-transparent border-t-transparent border-r-[rgb(236,34,84)]
        "
          style={{
            transform:
              "translate(calc(-50% + 2px),calc(50% - 2px)) rotate(-45deg)",
          }}
        />
      </button>
    )
  );
}

export default NotificationsIndicator;

//! 236 34 84
//! 212 17 58
//! 251 237 236
