import { NotificationIndicator } from "@/app/(authed-routes)/_globalComponents/SideMenu/MenuItem/Notifications/_hooks/useNotificationIndicator";
import { useAnimatedMount } from "@/hooks/useAnimatedMount";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { FaComment, FaHeart } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";

function NotificationsIndicator({
  notificationIndicator,
  isRender,
}: {
  notificationIndicator: NotificationIndicator;
  isRender: boolean;
}) {
  const { follow, comment, like } = notificationIndicator;

  const { device } = useAppSelector((s) => s.modals);
  const isMobile = device.type === "mobile";

  const dispatch = useAppDispatch();

  const { isMounted, style } = useAnimatedMount(isRender, "scale");

  return (
    isMounted &&
    isMobile && (
      <button
        className="absolute top-9 -right-1
        flex items-start gap-x-2 bg-[rgb(255,48,64)] py-1 px-2 rounded-[50vw] shadow-inner transition-all"
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
          className="absolute top-0 right-0
            border-8 border-b-transparent border-l-transparent border-t-transparent border-r-[rgb(236,34,84)]
        "
          style={{
            transform:
              "translate(calc(0% - 10px),calc(-100% + 2px)) rotate(90deg)",
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
