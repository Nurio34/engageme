import Variant from "./Variant";
import Search from "./Search";
import Notifications from "./Notifications";

function Client() {
  return (
    <header className="w-full border-b md:h-11 flex items-center gap-x-4 px-4 py-2 md:p-0">
      <Variant />
      <Search />
      <Notifications />
    </header>
  );
}
export default Client;
