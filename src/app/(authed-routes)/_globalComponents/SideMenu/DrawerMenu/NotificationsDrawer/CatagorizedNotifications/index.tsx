import { CatagorizedNotificationType } from "../../types";
import CatagorizedNotification from "./CatagorizedNotification";

function CatagorizedNotifications({
  catagorizedNotifications,
}: {
  catagorizedNotifications: CatagorizedNotificationType[];
}) {
  return (
    <ul className="overflow-y-auto">
      {catagorizedNotifications.map((catagorizedNotification, index) => (
        <CatagorizedNotification
          key={index}
          catagorizedNotification={catagorizedNotification}
        />
      ))}
    </ul>
  );
}
export default CatagorizedNotifications;
