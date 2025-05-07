import { CatagorizedNotificationType, NotificationType } from "..";
import Notification from "./Notification";

function CatagorizedNotification({
  catagorizedNotification,
}: {
  catagorizedNotification: CatagorizedNotificationType;
}) {
  const { time, notifications } = catagorizedNotification;

  return (
    notifications.length > 0 && (
      <li
        className={`px-6 pb-2 border-b-[1px] ${time !== "new" ? "pt-3" : ""}`}
      >
        <h2 className="capitalize font-bold pb-3">{time}</h2>
        <ul className="grid gap-y-2">
          {notifications.map((notification, index) => (
            <Notification key={index} notification={notification} />
          ))}
        </ul>
      </li>
    )
  );
}
export default CatagorizedNotification;
