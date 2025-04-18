import SearchDrawer from "./SearchDrawer";
import NotificationsDrawer from "./NotificationsDrawer";

function Client({ navWidth }: { navWidth: number }) {
  return (
    <>
      <SearchDrawer navWidth={navWidth} />
      <NotificationsDrawer navWidth={navWidth} />
    </>
  );
}
export default Client;
