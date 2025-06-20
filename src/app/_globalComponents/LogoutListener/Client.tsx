import { useAppDispatch } from "@/store/hooks";
import { resetHomePage } from "@/store/slices/homePage";
import { resetModals } from "@/store/slices/modals";
import { resetNotifications } from "@/store/slices/notifications";
import { resetSidemenu } from "@/store/slices/sidemenu";
import { clearSocket } from "@/store/slices/socket";
import { resetUser } from "@/store/slices/user";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

function Client() {
  const { user, isSignedIn } = useUser();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSignedIn === undefined) return;

    if (!user) {
      dispatch(resetHomePage());
      dispatch(resetModals());
      dispatch(resetNotifications());
      dispatch(resetSidemenu());
      dispatch(clearSocket());
      dispatch(resetUser());
    }
  }, [user, isSignedIn]);

  return <div hidden />;
}
export default Client;
