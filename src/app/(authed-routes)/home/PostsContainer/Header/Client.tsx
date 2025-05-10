import Variant from "./Variant";
import Search from "./Search";
import Notifications from "./Notifications";
import { useEffect, useState } from "react";
import NotificationButton from "./NotificationButton";

function Client() {
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    setIsRender(true);
  }, []);

  return (
    isRender && (
      <header className="w-full border-b md:h-11 flex items-center gap-x-4 px-4 py-2 md:p-0 ">
        <Variant />
        <Search />
        <NotificationButton />
        <Notifications />
      </header>
    )
  );
}
export default Client;
